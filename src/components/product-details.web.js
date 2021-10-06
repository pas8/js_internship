import '@components/stars.web.js';
import '@components/quantity-counter.web.js';
import '@styles/_web-product-details.scss';
import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';

import compareSvg from '@svgs/compare.svg';
import favouriteSvg from '@svgs/favourite.svg';

class ProductDetails extends HTMLElement {
  constructor() {
    super();

    this.imgsArr = [
      this.getAttribute('image'),
    ];
    this.activeImgIdx = 0;
    this.price = `${this.getAttribute('price')}$`;
    this.tabIdx = 0;
    this.id = this.getAttribute('id');
    this.title = this.getAttribute('caption');
    this.ratingValue = this.getAttribute('rating-value');
    this.ratingCount = this.getAttribute('rating-count');
    this.description = this.getAttribute('description');
    this.denotationPreview = [...this.description].filter((__, idx) => idx < 100).join('') + '...';

    this.additionalInfo = [
      { caption: 'Placeholder1', value: 'some value' },
      { caption: 'Placeholder2', value: 'some value' },
      { caption: 'Placeholder3', value: 'some value' },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class='product-details-content'>
      <div class='product-details-content__product-gallery'>
        <div class='product-details-content__product-gallery__main-img'>
          <img src=${this.imgsArr[0]}  />
        </div>
        <div class='product-details-content__product-gallery__tabs'>
          ${this.imgsArr
            .map(
              (src, idx) =>
                `<img src='${src}' class='${idx === this.activeImgIdx ? 'active' : ''}' style=width:${
                  ~~(100 / this.imgsArr.length) + '%'
                } />`
            )
            .join('')}
        </div>
      </div>
      <div class='product-details-content__info'>
        <div class='product-details-content__info-acticle'>
          <div class='product-details-content__info-acticle__caption'>${this.title}</div>
          <div class='product-details-content__info-acticle__stars'>
            <stars-feedback value=${this.ratingValue}></stars-feedback>
            <p class='product-details-content__info-acticle__stars-denotation'>
              ( ${this.ratingCount} customer reviews )
            </p>
          </div>
          <div class='product-details-content__info-acticle__price'>${this.price}</div>
        </div>
        <div class='product-details-content__info-denotation'>
          <div class='product-details-content__info-denotation__text'>
            ${this.denotationPreview}
          </div>
          <div class='product-details-content__info-denotation__propertyies'>
            <p class='item'> SKU: BIA011</p>
            <p class='item'>Categories: Chair, Solutions, W-ACS</p>
            <p class='item'>Tags: Accessories, Gaming</p>
          </div>
        </div>
        <div class='product-details-content__info-utils'>
          <div class='product-details-content__info-utils__quantity'>
            <p>Quantity:</p>
            <quantity-counter></quantity-counter>
          </div>
          <button class='product-details-content__info-utils__add-to-cart-button button-outlined'> Add to cart</button>
          <button class='product-details-content__info__utils-favourite button-outlined button'>
            ${favouriteSvg}
          </button>
          <button class='product-details-content__info__utils-compare button-outlined button'>
            ${compareSvg}
          </button>
        </div>
        <div class='product-details-content__info-extended'>
          <div class='product-details-content__info-extended__tabs'>
            <div class='product-details-content__info-extended__tabs-title-row'>
              <button class='product-details-content__info-extended__tabs-title product-details-content__info-extended__tabs-title--active'>
                Desciption
              </button>
              <button class='product-details-content__info-extended__tabs-title'>
                Additional information
              </button>
              <button class='product-details-content__info-extended__tabs-title '>
                Reviews  (${this.ratingCount})
              </button>
            
              </div>
          <div class='product-details-content__info-extended__tabs-content'>
          <div class='description' > ${this.description}</div>
          </div>

        </div>
      </div>
      </div>
`;

    const addToCardButtonNode = document.querySelector('.product-details-content__info-utils__add-to-cart-button');

    addToCardButtonNode.addEventListener('click', () => {
      set_product_to_basket(this.id);
    });
    window.localStorage.getItem('basket');

    const previewGalleryNode = document.querySelector('.product-details-content__product-gallery__main-img');
    const galleryTabsNode = document.querySelector('.product-details-content__product-gallery__tabs');

    // console.log(galleryTabsNodeArr);
    galleryTabsNode.childNodes.forEach((el, idx) => {
      el.addEventListener('click', () => {
        galleryTabsNode.childNodes.forEach((item) => (item.classList = ''));
        el.classList = 'active';
        this.activeImgIdx = idx;
        previewGalleryNode.children[0].setAttribute('src', this.imgsArr[idx - 1]);
      });
    });
    const contentInfoExtendedTabsContentArr = [
      `<div class='description' > ${this.description}</div>`,
      `<div class='additional-info'>${this.additionalInfo.map_join(
        ({ caption, value }) =>
          `<div><p class='additional-info__caption'>${caption}:</p><p class='additional-info__value'> ${value}</p></div>`
      )}</div>`,
      `<div class='review'>
        <stars-feedback value='0'></stars-feedback>
        
      </div>`,
    ];

    const tabNodes = document.querySelectorAll('.product-details-content__info-extended__tabs-title');
    const tabContentNode = document.querySelector('.product-details-content__info-extended__tabs-content');
    tabNodes.forEach((__, idx) => {
      __.addEventListener('click', () => {
        const isCurrentTabSelected = this.tabIdx === idx;
        if (isCurrentTabSelected) return;
        this.tabIdx = idx;
        const activeClass = `product-details-content__info-extended__tabs-title--active`;
        tabNodes.forEach((el) => el.classList.remove(activeClass));
        __.classList.add(activeClass);
        tabContentNode.innerHTML = contentInfoExtendedTabsContentArr[this.tabIdx];
      });
    });
  }
}

if (!customElements.get('product-details')) customElements.define('product-details', ProductDetails);
