import '@components/stars.web.js';
import '@components/quantity-counter.web.js';
import '@styles/_web-product-details.scss';
import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { get_categories_arr_from_arr_ids } from '@utils/get_categories_arr_from_arr_ids.util.js';
import IMask from 'imask';

import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import compareSvg from '@svgs/compare.svg';
import favouriteSvg from '@svgs/favourite.svg';
import { use_toast } from '@utils/use_toast.util.js';
class ProductDetails extends HTMLElement {
  constructor() {
    super();
    this.imgsArr = [this.getAttribute('image'), ...(this.getAttribute('gallery')?.split(',') || [''])];
    this.activeImgIdx = 0;
    this.price = `${this.getAttribute('price')}${get_correct_currency()}`;
    this.tabIdx = 0;
    this.id = this.getAttribute('id');
    this.caption = this.getAttribute('caption');
    this.ratingValue = this.getAttribute('rating-value');
    this.ratingCount = this.getAttribute('rating-count');
    this.description = this.getAttribute('description') || '';
    this.denotationPreview = [...this.description].filter((__, idx) => idx < 100).join('') + '...';
    this.additionalInfo = JSON.parse(this.getAttribute('addition_propertyies')) || {};
  }

// console.log()

  async connectedCallback() {
    this.categories = await get_categories_arr_from_arr_ids(this.getAttribute('categories')?.split(','));

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
          <div class='product-details-content__info-acticle__caption'>${this.caption}</div>
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
            <p class='item'>Categories: ${this.categories.map_join(
              ({ id, name }) => `<a href="/pages/shop.html?category=${id}">${name}</a>`,
              ', '
            )}</p>
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
      `<div class='additional-info'>${Object.entries(this.additionalInfo)?.map_join(
        ([caption, value]) =>
          `<div><p class='additional-info__caption'>* ${caption}:</p><p class='additional-info__value'> ${value}</p></div>`
      )}</div>`,

      `<div class='review'>
          <div>
            <p>Your Feedback</p>
            <div class='rating'>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <form>
            <input name='name' placeholder='Name' class='input' required>
            </input>
            <input name='email' placeholder='Email' class='input'>
            </input>
            <textarea name='message' placeholder='Message' class='input' required></textarea>
            <button class='submit_button button--contained'>Send feedback</button>
          </form>
        </div>
      `,
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

        const form_node = document?.querySelector('form');

        // const email_mask =
        IMask(form_node?.children?.[1], { mask: /^\S*@?\S*$/ });

        document?.querySelector('.rating')?.addEventListener('click', function (e) {
          let action = 'add';
          for (const span of this.children) {
            span.classList[action]('active');
            if (span === e.target) action = 'remove';
          }
        });

        document?.querySelector('.submit_button')?.addEventListener('click', async (e) => {
          e.preventDefault();
          const rating =
            [...document?.querySelector('.rating').children].filter((el) => !!el?.classList[0])?.length || 0;
          const props = Object.fromEntries([...new FormData(form_node)]);
          // email_mask.
          // props.map((el, idx) => {
          // console.log(el, idx);
          // });

          const token = window.localStorage.getItem('user_token');
          // props

          // !!emailOrPhone.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          const [res, err] = await use_xml_http_request(
            `add_product_review?id=${this.id}`,
            'POST',
            JSON.stringify({ ...props, rating, token })
          );
          if (!!err) return use_toast(err,'error');
          return use_toast(res,'info');
        });
      });
    });
  }
}

if (!customElements.get('product-details')) customElements.define('product-details', ProductDetails);
