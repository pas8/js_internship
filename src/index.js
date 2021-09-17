import Glide from '@glidejs/glide';
import './index.scss';
const d = document.querySelector('.main-row__links');
const findedLink = [...d.childNodes]
  .filter((__, idx) => !(idx & 1))
  .find((el) => el.classList[1] === window.location.pathname);
findedLink.classList.add('main-row__links__link-wrapper--active');

const favouriteNode = document.querySelector('.button-favourite');
const basketNode = document.querySelector('.button-basket');
// console.log(favouriteNode.setAttributeNS)
favouriteNode.classList.add('with-label');
favouriteNode.setAttribute('data-label', '42');

basketNode.classList.add('with-label');
basketNode.setAttribute('data-label', '8');

class SpecicalProduct extends HTMLElement {
  connectedCallback() {
    // let isHovering = false;
    const sale_percent = this.getAttribute('sale_percent');
    const img_href = this.getAttribute('img_href');
    const stars = this.getAttribute('stars');
    const caption = this.getAttribute('caption');
    const is_new = this.getAttribute('is_new');
    const is_favourite = this.getAttribute('is_favourite');
    const current_price = this.getAttribute('current_price');
    const old_price = this.getAttribute('old_price');
    console.log(stars)
    // this.onmouseenter = () => (isHovering = true);
    // this.onmouseleave = () => (isHovering = false);

    this.innerHTML = `<div class='special-product'>

    <div class='special-product-content'>
      <div class='special-product-content__utils'>
        <div class='special-product-content__utils-compare button-outlined'>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
          </svg>
        </div>
        <div class='special-product-content__utils-add-to-card button-outlined'>
          Add to card
        </div>
        <div class='special-product-content__utils-search button-outlined'>
          <svg  viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </div>

      </div>

      
    <div class='special-product-content__labels'>
    ${!!sale_percent ? `<div class='special-product-content__labels-sale'> -${sale_percent}% </div>` : ''}
    ${!!is_new ? `<div class='special-product-content__labels-new'> New </div>` : ''}
    </div>

    <img src=${img_href}/>
    </div>

      <div class='special-product__stars'>
      ${Array(5)
        .fill(null)
        .map((__, idx) => (
          `<svg viewBox='0 0 24 24'>
            <path
              fill=${+stars <= idx ? 'none' : 'currentColor'}
              stroke='currentColor'
              d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z'
            ></path>
          </svg>`
        )).join('')}
      </div>
      <div class='special-product__caption'>
      ${caption}
      </div>

      <div class='special-product__price'>
        <p class='special-product__price-current'>
        ${current_price}
        </p>
        ${
          !!old_price ? 
          ` <p class='special-product__price-current'>
        ${old_price}
        </p>` : ''
        }

      </div>
      </div>

    </div>`;
  }
}
customElements.define('special-product', SpecicalProduct);

new Glide('.glide').mount();

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

    if ($columns.length === colCount) return;

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
