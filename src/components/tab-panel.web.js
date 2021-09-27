import { get_random_int } from '../utils/get_random_int.util.js';
import { get_random_img } from '../utils/get_random_img.util.js';
import { convert_rem_to_pixels } from '../utils/convert_rem_to_pixels.util.js';

const tabpanelArr = ['Cup cakes', 'Cookies', 'Donut', 'Custard'].map((el, idx) => ({
  id: idx + '',
  caption: el,
  productsArr: Array.from({ length: get_random_int(16, 24) }, (__, idx) => ({
    img_href: get_random_img(),
    sale_percent: get_random_int(8, 92),
    is_new: '1',
    stars: get_random_int(0, 5),
    caption: el,
    current_price: '$' + get_random_int(8, 42),
  })),
}));
const featureProductsTabPanel = document.querySelector('.feature-products-tab-panel');
featureProductsTabPanel.innerHTML = `
${tabpanelArr
  .map(
    ({ caption, productsArr }, idx) => `
    <p slot='tab'> ${caption}</p>
    <div slot='content'>
      <div class='feature-products-glide container'>
        <svg class='slider-prev-button' id=${idx} viewBox='0 0 24 24'>
          <path d='M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'></path>
        </svg>

        <div class='feature-products-glide__track' style='transform:translateX(0px)' id={idx}>
          <div class='feature-products-glide__slides'>
            ${productsArr
              .map(
                ({ img_href, sale_percent, is_new, stars, caption, current_price }) =>
                  ` <div class='feature-products-glide__slide' ><special-product  img_href=${img_href}  sale_percent=${sale_percent} is_new=${is_new} stars=${stars} caption=${caption} current_price=${current_price}></current_price></div>`
              )
              .join('')}
          </div>
        </div>
        <svg class='slider-next-button' id=${idx} viewBox='0 0 24 24'>
          <path d='M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
        </svg>
      </div>
    </div>
`
  )
  .join('')}
`;

class TabPanel extends HTMLElement {
  observedAttributes = ['selected-index', 'direction'];
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
    this.render();
    this.cacheDom();
    this.attachEvents();
    this.dom.tabs[this.#selectedIndex]?.classList.add('selected');
    this.dom.contents[this.#selectedIndex]?.classList.add('selected');
    this.track = document.querySelectorAll('.feature-products-glide__track')[this.#selectedIndex];
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
    const GAP = convert_rem_to_pixels(2);
    const PRODUCT_WIDTH = 280 + GAP;

    const tracksArr = [...document.querySelectorAll('.feature-products-glide__track')].sort((a, b) => +a.id - +b.id);

    const handleTranslateSlider = (id, direction = 'prev') => {

      const MAX_LENGTH = ((tracksArr[+id].children[0].children.length - 2) * PRODUCT_WIDTH) / 2;
      const CURRENT_TRANSLATE_VALUE =
        +tracksArr[+id].style.transform.split('(')[1].split('px')[0] +
        (direction === 'prev' ? PRODUCT_WIDTH : -PRODUCT_WIDTH);
      const isSlidergetAway = Math.abs(CURRENT_TRANSLATE_VALUE) > MAX_LENGTH;
      tracksArr[+id].style.transform = `translateX(${isSlidergetAway ? 0 : CURRENT_TRANSLATE_VALUE}px)`;
    };

    document.querySelectorAll('.slider-next-button').forEach((el) =>
      el.addEventListener('click', (e) => {
        const { id } = e.target;
        handleTranslateSlider(id, 'next');
      })
    );
    document.querySelectorAll('.slider-prev-button').forEach((el) =>
      el.addEventListener('click', (e) => {
        const { id } = e.target;
        handleTranslateSlider(id);
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

if (!customElements.get('tab-panel')) customElements.define('tab-panel', TabPanel);
