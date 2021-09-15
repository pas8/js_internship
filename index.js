import './index.scss';

const DEFAULT_MAX_COL_WIDTH = 500;
const DEFAULT_COLS = 'auto';
const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_GAP_PX = 12;
const ELEMENT_NODE_TYPE = 1;

const COL_COUNT_CSS_VAR_NAME = `--_masonry-layout-col-count`;
const GAP_CSS_VAR_NAME = `--_masonry-layout-gap`;

const $template = document.createElement('template');
$template.innerHTML = `
    <style>
      :host {
        display: flex;
        align-items: flex-start;
        justify-content: stretch;
      }
      .column {
      max-width: calc((100% / var(${COL_COUNT_CSS_VAR_NAME}, 1) - ((var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px) * (var(${COL_COUNT_CSS_VAR_NAME}, 1) - 1) / var(${COL_COUNT_CSS_VAR_NAME}, 1)))));
      width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .column:not(:last-child) {
        margin-right: var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px);
      }
      .column ::slotted(*) {
        margin-bottom: var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px);
        box-sizing: border-box;
        width: 100%;
      }
      #unset-items {
        opacity: 0;
        position: absolute;
        pointer-events: none;
      }
    </style>
    <div id="unset-items">
      <slot></slot>
    </div>
  `;

const getNumberAttribute = ($elem, name, defaultValue) => {
  const value = parseFloat($elem.getAttribute(name) || '');
  return isNaN(value) ? defaultValue : value;
};

const getColCount = (totalWidth, cols, maxColWidth) => {
  return isNaN(cols) ? Math.max(1, Math.ceil(totalWidth / maxColWidth)) : cols;
};

const debounce = (cb, ms, id) => {
  const DEBOUNCE_MAP = new Map();

  const existingTimeout = DEBOUNCE_MAP.get(id);
  if (existingTimeout != null) window.clearTimeout(existingTimeout);
  DEBOUNCE_MAP.set(id, window.setTimeout(cb, ms));
};
const findSmallestColIndex = (colHeights) => {
  let smallestIndex = 0;
  let smallestHeight = Infinity;
  colHeights.forEach((height, i) => {
    if (height < smallestHeight) {
      smallestHeight = height;
      smallestIndex = i;
    }
  });

  return smallestIndex;
};

class MasonryLayout extends HTMLElement {
  static get observedAttributes() {
    return ['maxcolwidth', 'gap', 'cols'];
  }

  set maxColWidth(v) {
    this.setAttribute('maxcolwidth', v.toString());
  }

  get maxColWidth() {
    return getNumberAttribute(this, 'maxcolwidth', DEFAULT_MAX_COL_WIDTH);
  }

  set cols(v) {
    this.setAttribute('cols', v.toString());
  }
  get cols() {
    return getNumberAttribute(this, 'cols', DEFAULT_COLS);
  }
  set gap(v) {
    this.setAttribute('gap', v.toString());
  }
  get gap() {
    return getNumberAttribute(this, 'gap', DEFAULT_GAP_PX);
  }
  set debounce(v) {
    this.setAttribute('debounce', v.toString());
  }
  get debounce() {
    return getNumberAttribute(this, 'debounce', DEFAULT_DEBOUNCE_MS);
  }
  get $columns() {
    return Array.from(this.shadowRoot.querySelectorAll(`.column`));
  }
  debounceId = `layout_${Math.random()}`;
  $unsetElementsSlot;
  ro = undefined;
  currentRequestAnimationFrameCallback = undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild($template.content.cloneNode(true));

    this.onSlotChange = this.onSlotChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.layout = this.layout.bind(this);

    this.$unsetElementsSlot = this.shadowRoot.querySelector('#unset-items > slot');
  }

  connectedCallback() {
    this.$unsetElementsSlot.addEventListener('slotchange', this.onSlotChange);

    if ('ResizeObserver' in window) {
      this.ro = new ResizeObserver(this.onResize);
      this.ro.observe(this);
    } else {
      window.addEventListener('resize', this.onResize);
    }
  }

  disconnectedCallback() {
    this.$unsetElementsSlot.removeEventListener('slotchange', this.onSlotChange);
    window.removeEventListener('resize', this.onResize);
    if (this.ro != null) {
      this.ro.unobserve(this);
    }
  }

  attributeChangedCallback(name) {
    switch (name) {
      case 'gap':
        this.style.setProperty(GAP_CSS_VAR_NAME, `${this.gap}px`);
        break;
    }

    this.scheduleLayout();
  }

  onSlotChange() {
    const $unsetElements = (this.$unsetElementsSlot.assignedNodes() || []).filter(
      (node) => node.nodeType === ELEMENT_NODE_TYPE
    );

    if ($unsetElements.length > 0) {
      this.layout();
    }
  }

  onResize(entries) {
    const { width } =
      entries != null && Array.isArray(entries) && entries.length > 0
        ? entries[0].contentRect
        : { width: this.offsetWidth };

    const colCount = getColCount(width, this.cols, this.maxColWidth);

    if (colCount !== this.$columns.length) {
      this.scheduleLayout();
    }
  }

  renderCols(colCount) {
    const $columns = this.$columns;

    if ($columns.length === colCount)   return;
    

    for (const $column of $columns) {
      $column.parentNode && $column.parentNode.removeChild($column);
    }

    for (let i = 0; i < colCount; i++) {
      const $column = document.createElement(`div`);
      $column.classList.add(`column`);
      $column.setAttribute(`part`, `column column-${i}`);

      const $slot = document.createElement(`slot`);
      $slot.setAttribute(`name`, i.toString());

      $column.appendChild($slot);
      this.shadowRoot.appendChild($column);
    }

    this.style.setProperty(COL_COUNT_CSS_VAR_NAME, colCount.toString());

  }

  scheduleLayout(ms = this.debounce) {
    debounce(this.layout, ms, this.debounceId);
  }

  layout() {
    if (this.currentRequestAnimationFrameCallback != null) {
      window.cancelAnimationFrame(this.currentRequestAnimationFrameCallback);
    }

    this.currentRequestAnimationFrameCallback = requestAnimationFrame(() => {
      const gap = this.gap;
      const $elements = Array.from(this.children).filter((node) => node.nodeType === ELEMENT_NODE_TYPE);
      const colCount = getColCount(this.offsetWidth, this.cols, this.maxColWidth);

      const colHeights = Array(colCount).fill(0);
      const writes = [];

      for (const $elem of $elements) {
        const height = $elem.getBoundingClientRect().height;
        let smallestColIndex = findSmallestColIndex(colHeights);

        colHeights[smallestColIndex] += height + gap;

        const newSlot = smallestColIndex.toString();
        if ($elem.slot !== newSlot) {
          writes.push(() => ($elem.slot = newSlot));
        }
      }

      for (const write of writes) {
        write();
      }
      this.renderCols(colCount);
    });
  }
}

customElements.define('masonry-layout', MasonryLayout);
