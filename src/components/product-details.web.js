import '@components/stars.web.js';
import '@styles/_web-product-details.scss';
import { get_avg_from_arr } from '@utils/get_avg_from_arr.util.js';
import arrowNextSvg from '@svgs/arrow_next.svg';
import arrowPrevSvg from '@svgs/arrow_prev.svg';

import compareSvg from '@svgs/compare.svg';
import favouriteSvg from '@svgs/favourite.svg';

class ProductDetails extends HTMLElement {
  constructor() {
    super();

    this.imgsArr = [
      '90249b7fa32e303d2230923fa60540b6.jpeg',
      'a32cc400a69328c2c36477d9c6accbae.jpeg',
      'a28e70c1594e6c5d70c1ad7437fa070b.jpeg',
    ];
    this.activeImgIdx = 0;
    this.starsValue = +'4';
    this.price = `$12.0`;
    this.tabIdx = 0;
    this.title = 'Placeholder';
    this.reviews = [5, 4, 2, 4];
    this.quantityValue = 1;
    this.denotationText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus
    vel facilisis. Etiam cursus condimentum vulputate.`;

    this.description = `Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate at dolor et, malesuada ultrices nisi. Ut
    varius ex ut purus porttitor, a facilisis orci condimentum. Nullam in elit et sapien ornare pellentesque
    at ac lorem. Cras suscipit, sapien in pellentesque hendrerit, dolor quam ornare nisl, vitae tempus nibh
    urna eget sem. Duis non interdum arcu, sit amet pellentesque odio. In sit amet aliquet augue.
    Etiam cursus condimentum vuputate. Nulla nisi orci, vulputate at dolor et, malesuada ultrices nisi. Ut
    varius ex ut purus porttitor, a facilisis orci condimentum. Nullam in elit et sapien ornare pellentesque
    at ac lorem. Cras suscipit, sapien in pellentesque hendrerit, dolor quam ornare nisl, vitae tempus nibh
    urna eget sem. Duis non interdum arcu, sit amet pellentesque odio. In sit amet aliquet augue.`;
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
            <stars-feedback value=${get_avg_from_arr(this.reviews)}></stars-feedback>
            <p class='product-details-content__info-acticle__stars-denotation'>
              ( ${this.reviews.length} customer reviews )
            </p>
          </div>
          <div class='product-details-content__info-acticle__price'>${this.price}</div>
        </div>
        <div class='product-details-content__info-denotation'>
          <div class='product-details-content__info-denotation__text'>
            ${this.denotationText}
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
            <div class='product-details-content__info-utils__quantity-counter'>
              <button class='product-details-content__info-utils__quantity-counter__button-less'>
                ${arrowPrevSvg}
              </button>

              <p class='product-details-content__info-utils__quantity-counter__value'>${this.quantityValue}</p>
              <button class='product-details-content__info-utils__quantity-counter__button-more'>
                ${arrowNextSvg}
              </button>
            </div>
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
                Reviews  (${this.reviews.length})
              </button>
            
              </div>
          <div class='product-details-content__info-extended__tabs-content'>
          <div class='description' > ${this.description}</div>
          </div>

        </div>
      </div>
      </div>
`;

    const quantityCounterButtonMoreNode = document.querySelector(
      '.product-details-content__info-utils__quantity-counter__button-more'
    );
    const quantityCounterButtonLessNode = document.querySelector(
      '.product-details-content__info-utils__quantity-counter__button-less'
    );

    const quantityCounterValueNode = document.querySelector(
      '.product-details-content__info-utils__quantity-counter__value'
    );

    const handleUpdateCounterValue = () => {
      quantityCounterValueNode.innerHTML = this.quantityValue;
    };

    quantityCounterButtonLessNode.addEventListener('click', () => {
      this.quantityValue -= 1;
      handleUpdateCounterValue();
    });
    quantityCounterButtonMoreNode.addEventListener('click', () => {
      this.quantityValue += 1;
      handleUpdateCounterValue();
    });

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
      `<div class='additional-info'>${this.additionalInfo
        .map(
          ({ caption, value }) =>
            `<div><p class='additional-info__caption'>${caption}:</p><p class='additional-info__value'> ${value}</p></div>`
        )
        .join('')}</div>`,
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
