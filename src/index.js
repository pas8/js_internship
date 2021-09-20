import Glide from '@glidejs/glide';
import './styles/index.scss';
new Glide('.glide').mount();

const findedLink = [...document.querySelector('.main-row__links').childNodes]
  .filter((__, idx) => !(idx & 1))
  .find((el) => el.classList[1] === window.location.pathname);

findedLink.classList.add('main-row__links__link-wrapper--active');

const favouriteNode = document.querySelector('.button-favourite');
const basketNode = document.querySelector('.button-basket');

favouriteNode.classList.add('with-label');
favouriteNode.setAttribute('data-label', '42');

basketNode.classList.add('with-label');
basketNode.setAttribute('data-label', '8');

class SpecicalProduct extends HTMLElement {
  connectedCallback() {
    const sale_percent = this.getAttribute('sale_percent');
    const img_href = this.getAttribute('img_href');
    const stars = this.getAttribute('stars');
    const caption = this.getAttribute('caption');
    const is_new = this.getAttribute('is_new');
    const is_favourite = this.getAttribute('is_favourite');
    const current_price = this.getAttribute('current_price');
    const old_price = this.getAttribute('old_price');

    this.innerHTML = `<div class='special-product'>
    <div class='special-product-content'>
    <button class='special-product-content__favourite-button  button-outlined ${
      is_favourite ? 'button-outlined--active' : ''
    }'>
    <svg  viewBox="0 0 24 24" aria-hidden="true" ><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
</button>
      <div class='special-product-content__utils'>
        <button class='special-product-content__utils-compare button-outlined'>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
          </svg>
        </button>
        <button class='special-product-content__utils-add-to-card button-outlined'>
          Add to card
        </button>
        <button class='special-product-content__utils-search button-outlined'>
          <svg  viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>

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
        .map(
          (__, idx) =>
            `<svg viewBox='0 0 24 24'>
            <path
              fill=${+stars <= idx ? 'none' : 'currentColor'}
              stroke='currentColor'
              d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z'
            ></path>
          </svg>`
        )
        .join('')}
      </div>
      <div class='special-product__caption'>
      ${caption}
      </div>

      <div class='special-product__price'>
        <p class='special-product__price-current'>
        ${current_price}
        </p>
        ${
          !!old_price
            ? ` <p class='special-product__price-old>
        ${old_price}
        </p>`
            : ''
        }
      </div>
      </div>
    </div>`;
  }
}
customElements.define('special-product', SpecicalProduct);

class FeatureProductsTab extends HTMLElement {
  constructor() {
    super();

    this.featureProductsTabNames = this.activeTab = '1';
    console.log(this.activeTab);
  }

  log(e) {
    this.activeTab = e.name;
    this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML = `<div class='feature-product-tabs'>
      <div class='feature-product-tabs__utils'>
      ${this.featureProductsTabNames
        .map(({ caption, id }) => {
          return ` <button name=${id} onclick='this.getRootNode().host.log(this)'>${caption} </button>`;
        })
        .join('')}
      </div>
    </div>
    `;
  }
}

customElements.define('feature-product-tabs', FeatureProductsTab);

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

class SocialUtils extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `<div class="social-utils">
    <a href="/facebook"
      ><svg class="facebook" viewBox="0 0 24 24">
        <path
          d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
        ></path></svg></a
    ><a href="/twitter"
      ><svg class="twitter" viewBox="0 0 24 24">
        <path
          d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
        ></path></svg></a
    ><a href="/instagram"
      ><svg class="instagram" viewBox="0 0 24 24">
        <path
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
        ></path></svg></a
    ><a href="/youtube"
      ><svg class="youtube" viewBox="0 0 24 24">
        <path
          d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
        ></path></svg
    ></a>
  </div>`

  }

}

customElements.define('social-utils', SocialUtils);



const getRandomInt = (min, max) => ~~(Math.random() * (~~max - Math.ceil(min)) + Math.ceil(min));

class TimeLeft extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class='time'> ${[
      { caption: 'Day', max: 31 },
      { caption: 'Hours', max: 24 },
      { caption: 'Mins', max: 60 },
      { caption: 'Secs', max: 60 },
    ].map(
      ({ caption, max },idx) =>
        `<div class='time-item'><p class='time-item__value'>${getRandomInt(1, max)} </p><p class='time-item__caption'>${caption}</p>${idx !== 3 ?`<p class='time-item__dispencer'>:</p>` : ''}</div>`
    ).join('')} </div>`;
  }
}

customElements.define('time-left', TimeLeft);

const featureProductsTabPanel = document.querySelector('.feature-products-tab-panel');

const tabpanelArr = [
  {
    id: '1',
    caption: 'Cup cakes',
    productsArr: [
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '22',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '',
        is_new: 'true',
        stars: '4',
        caption: 'Test 2',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
    ],
  },
  {
    id: '2',
    caption: 'Cookies',
    productsArr: [
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
    ],
  },
  {
    id: '3',
    caption: 'Donut',
    productsArr: [
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
    ],
  },
  {
    id: '4',
    caption: 'Custard',
    productsArr: [
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
    ],
  },
  {
    caption: 'Tower cakes',
    id: '5',
    productsArr: [
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
      {
        img_href: 'https://via.placeholder.com/150x200/0000FF/808080',
        sale_percent: '42',
        is_new: 'true',
        stars: '4',
        caption: 'Test 1',
        current_price: '$20.0',
      },
    ],
  },
];
featureProductsTabPanel.innerHTML = `
${tabpanelArr
  .map(
    ({ caption, productsArr }, idx) => `
<p slot='tab'> ${caption}</p>
<div slot='content'>
<div class='feature-products-glide container'>
<svg class='slider-prev-button'  id=${idx} viewBox="0 0 24 24"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg>

<div class='feature-products-glide__track' style='transform:translateX(0px)'  id=${idx}>

<div class='feature-products-glide__slides'>

${productsArr
  .map(
    ({ img_href, sale_percent, is_new, stars, caption, current_price }) =>
      `<div class='feature-products-glide__slide' ><special-product  img_href=${img_href}  sale_percent=${sale_percent} is_new=${is_new} stars=${stars} caption=${caption} current_price=${current_price}></current_price></div>`
  )
  .join('')}
</div>
</div>
<svg class='slider-next-button' id=${idx} viewBox="0 0 24 24"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>


</div>

</div>

</div>
`
  )
  .join('')}
`;

// featureProductsTabPanel.appendChild()

class TabPanel extends HTMLElement {
  static observedAttributes = ['selected-index', 'direction'];
  #selectedIndex = 0;
  #direction = 'row';

  constructor() {
    super();
    this.bind(this);
  }
  bind(element) {
    element.render = element.render.bind(element);
    element.attachEvents = element.attachEvents.bind(element);
    element.cacheDom = element.cacheDom.bind(element);
    element.onTabClick = element.onTabClick.bind(element);
    element.selectTabByIndex = element.selectTabByIndex.bind(element);
    element.onContentSlotChange = element.onContentSlotChange.bind(element);
    element.onTabSlotChange = element.onTabSlotChange.bind(element);
  }
  connectedCallback() {
    // this.root =)

    // console.log(this.root)

    this.render();
    this.cacheDom();
    this.attachEvents();
    this.dom.tabs[this.#selectedIndex]?.classList.add('selected');
    this.dom.contents[this.#selectedIndex]?.classList.add('selected');
    this.track = document.querySelectorAll('.feature-products-glide__track')[this.#selectedIndex];

    // const sliderElement = this.shadowRoot.querySelector('')
    // new Glide(sliderElement, {
    //   type: 'carousel',
    //   perView: 4,
    //   focusAt: 'center',
    //   breakpoints: {
    //     800: {
    //       perView: 2
    //     },
    //     480: {
    //       perView: 1
    //     }
    //   }
    // }).mount();
  }
  render() {
    this.shadow = this.attachShadow({ mode: 'open' });

    this.shadow.innerHTML = `
              <style>
                  :host { display: flex; flex-direction: column; }
                  :host([direction="column"]) { flex-direction: row; }
                  :host([direction="column"]) .tabs { flex-direction: column; }
                  .tabs { display: flex; flex-direction: row; flex-wrap: nowrap;  }

                  .tabs ::slotted(*) { padding: 5px; border: 1px solid #ccc; user-select: none; cursor: pointer; }
                  .tabs ::slotted(.selected) { background: #efefef; }
                  .tab-contents ::slotted(*) { display: none; }
                  .tab-contents ::slotted(.selected) { display: block;  }
              </style>
              <div class="tabs">
                  <slot id="tab-slot" name="tab"></slot>
              </div>
              <div class="tab-contents"> 
                  <slot id="content-slot" name="content"></slot>
              </div>
          `;
    // new Glide(this.shadowRoot.querySelector('.feature-products-glide')).mount();
  }
  cacheDom() {
    this.dom = {
      tabSlot: this.shadow.querySelector('#tab-slot'),
      contentSlot: this.shadow.querySelector('#content-slot'),
    };
    this.dom.tabs = this.dom.tabSlot.assignedElements();
    this.dom.contents = this.dom.contentSlot.assignedElements();
  }
  attachEvents() {
    const tracksArr = [...document.querySelectorAll('.feature-products-glide__track')].sort((a, b) => +a.id - +b.id);
    document.querySelectorAll('.slider-next-button').forEach((el) =>
      el.addEventListener('click', (e) => {
        const id = e.target.id;
        tracksArr[+id].style.transform = `translateX(${
          +tracksArr[+id].style.transform.split('(')[1].split('px')[0] - 280
        }px)`;
      })
    );
    document.querySelectorAll('.slider-prev-button').forEach((el) =>
      el.addEventListener('click', (e) => {
        const id = e.target.id;
        tracksArr[+id].style.transform = `translateX(${
          +tracksArr[+id].style.transform.split('(')[1].split('px')[0] + 280
        }px)`;
      })
    );

    this.dom.tabSlot.addEventListener('click', this.onTabClick);
    this.dom.tabSlot.addEventListener('slotchange', this.onTabSlotChange);
    this.dom.contentSlot.addEventListener('slotchange', this.onContentSlotChange);
  }
  onTabSlotChange() {
    this.dom.tabs = this.dom.tabSlot.assignedElements();
  }
  onContentSlotChange() {
    this.dom.contents = this.dom.contentSlot.assignedElements();
  }
  onTabClick(e) {
    const target = e.target;
    if (target.slot === 'tab') {
      const tabIndex = this.dom.tabs.indexOf(target);
      this.selectTabByIndex(tabIndex);
    }
  }
  selectTabByIndex(index) {
    const tab = this.dom.tabs[index];
    const content = this.dom.contents[index];
    if (!tab || !content) return;
    this.dom.contents.forEach((p) => p.classList.remove('selected'));
    this.dom.tabs.forEach((p) => p.classList.remove('selected'));
    content.classList.add('selected');
    tab.classList.add('selected');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'selected-index') {
        this.selectedIndex = newValue;
      } else {
        this[name] = newValue;
      }
    }
  }
  set selectedIndex(value) {
    this.#selectedIndex = value;
  }
  get selectedIndex() {
    return this.#selectedIndex;
  }
  set direction(value) {
    this.#direction = value;
    this.setAttribute('direction', value);
  }
  get direction() {
    return this.#direction;
  }
}

customElements.define('tab-panel', TabPanel);
