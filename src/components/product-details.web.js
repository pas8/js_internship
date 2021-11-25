import '@components/stars.web.js';
import '@components/quantity-counter.web.js';
import '@styles/_web-product-details.scss';
import { set_up_utils_of_product } from '@utils/set_up_utils_of_product.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { get_categories_arr_from_arr_ids } from '@utils/get_categories_arr_from_arr_ids.util.js';
import IMask from 'imask';

import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { get_avg_from_arr } from '@utils/get_avg_from_arr.util.js';
import { get_global_user_info } from '@utils/get_global_user_info.util.js';
import { get_user } from '@utils/get_user.util.js';
import compareSvg from '@svgs/compare.svg';
import favouriteSvg from '@svgs/favourite.svg';
import { use_toast } from '@utils/use_toast.util.js';
class ProductDetails extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `<div class='product-details__placeholder'>
      <div>
        <nb-skeleton height='600px' width='100%'></nb-skeleton>
        <nb-skeleton height='200px' width='100%'></nb-skeleton>
        <nb-skeleton height='80px' width='100%' count='4'></nb-skeleton>
      </div>
      <div>
        <nb-skeleton height='40px' width='80%'></nb-skeleton>
        <nb-skeleton height='80px' width='92%'></nb-skeleton>
        <nb-skeleton height='60px' width='60%'></nb-skeleton>
        <nb-skeleton height='142px' width='42%'></nb-skeleton>
        <nb-skeleton height='100px' width='96%'></nb-skeleton>
        <nb-skeleton height='200px' width='100%'></nb-skeleton>
        </div>
      </div>`;
    this.imgsArr = [this.getAttribute('image'), ...(this.getAttribute('gallery')?.split(',') || [''])];
    this.activeImgIdx = 0;
    this.price = `${this.getAttribute('price')}${get_correct_currency()}`;
    this.tabIdx = 0;
    this.id = this.getAttribute('id');
    this.feedback = JSON.parse(this.getAttribute('feedback'));
    this.caption = this.getAttribute('caption');
    this.avarage_rating_value = get_avg_from_arr(this.feedback.map(({ rating }) => rating));
    this.ratingCount = this?.feedback?.length || 0;
    this.description = this.getAttribute('description') || '';
    this.denotationPreview = [...this.description].filter((__, idx) => idx < 100).join('') + '...';

    this.additionalInfo = JSON.parse(this.getAttribute('addition_propertyies')) || {};

    this.genegate_feedback_item = async ({ _name, by, message, rating }) => {
      let name;
      if (!_name) {
        const global_user_info = await get_global_user_info(by);

        name = global_user_info.name;
      } else {
        name = _name;
      }
      return `<div class='product-details-content__feedback-item'>
              <div title> <p name>${name}</p>    <stars-feedback value=${rating}></stars-feedback> </div>
              <p message>${message}</p>
            </div>`;
    };
    this.feedback_html = (
      await Promise.all(this.feedback?.map(async (el) => await this.genegate_feedback_item(el)))
    ).join('');

    const [json, err] = await get_user();
    if (!!err) {
      this.is_auth = false;
    } else {
      this.user = JSON.parse(json);
      this.is_auth = true;
    }

    this.categories = await get_categories_arr_from_arr_ids(this.getAttribute('categories')?.split(','));

    this.innerHTML = `
      <div class='product-details-content'>
      <div class='product-details-content__product-gallery'>
        <div class='product-details-content__product-gallery__main-img'>
          <img src=${this.imgsArr[0]}  />
        </div>
        <div class='product-details-content__product-gallery__tabs'>
          ${this.imgsArr
            ?.map(
              (src, idx) =>
                `<img src='${src}' class='${idx === this.activeImgIdx ? 'active' : ''}' style=width:${
                  ~~(100 / this.imgsArr.length) + '%'
                } />`
            )
            .join('')}
        </div>
        <div class='product-details-content__feedback'>
        ${this.feedback_html}
        </div>
      </div>
      <div class='product-details-content__info'>
        <div class='product-details-content__info-acticle'>
          <div class='product-details-content__info-acticle__caption'>${this.caption}</div>
          <div class='product-details-content__info-acticle__stars'>
            <stars-feedback value=${this.avarage_rating_value}></stars-feedback>
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
            <p class='item'>Categories: ${this.categories
              ?.map(({ id, name }) => `<a href="/pages/shop.html?category=${id}">${name}</a>`, ', ')
              ?.join('')}</p>
            <p class='item'>Tags: Accessories, Gaming</p>
          </div>
        </div>
        <div class='product-details-content__info-utils'>
          <div class='product-details-content__info-utils__quantity'>
            <p>Quantity:</p>
            <quantity-counter></quantity-counter>
          </div>
          <button class='product-details-content__info-utils-add-to-card button button-outlined'> Add to cart</button>
          <button class='product-details-content__info-utils-favourite button-outlined button'>
            ${favouriteSvg}
          </button>
          <button class='product-details-content__info-utils-compare button-outlined button'>
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

    const handleSetUp = set_up_utils_of_product(this.id, 'product-details-content__info-utils').bind(this);
    handleSetUp();

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
            <input name='name' placeholder='Name' class='input' required ${
              this.is_auth ? `readonly value='${this.user?.name}'` : ''
            }>
            </input>
            <input name='email' placeholder='Email' class='input'  ${
              this.is_auth ? `readonly value='${this.user?.email}'` : ''
            }>
            </input>
            <textarea name='message' placeholder='Message' class='input' required></textarea>
            <button class='submit_button button--contained'>Send feedback</button>
          </form>
        </div>
      `,
    ];
    const feedback_container_node = document.querySelector('.product-details-content__feedback');
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
          const form_data = [...new FormData(form_node)];
          const name = form_data[0][1];
          const message = form_data[2][1];
          console.log(name);

          if (!name) return use_toast(form_data[0][0] + 'isEmpty', 'error');
          if (!form_data[1][1].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            return use_toast(form_data[1][0] + 'is not valid', 'error');
          if (!message) return use_toast(form_data[2][0] + 'isEmpty', 'error');

          const props = Object.fromEntries(form_data);
          const token = window.localStorage.getItem('user_token');

          const [res, err] = await use_xml_http_request(
            `add_product_review?id=${this.id}`,
            'POST',
            JSON.stringify({ ...props, rating, token })
          );
          if (!!err) {
            if (err === 'Conflict') {
              return use_toast('Check previuous emails with auth token', 'error');
            }
            return use_toast(err, 'error');
          }

          if (res === '"Your comment was added"') {
            feedback_container_node.insertAdjacentHTML(
              'beforeend',
              await this.genegate_feedback_item({ message, _name: name, rating })
            );
          }
          return use_toast(res, 'info');
        });
      });
    });
  }
}

if (!customElements.get('product-details')) customElements.define('product-details', ProductDetails);
