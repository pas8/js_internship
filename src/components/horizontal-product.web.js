import '@styles/_web-specical-products.scss';
import '@components/stars.web.js';
import favouriteSvg from '@svgs/favourite.svg';
import compareSvg from '@svgs/compare.svg';
import searchSvg from '@svgs/search.svg';
import { get_default_product_attribute_values } from '@utils/get_default_product_attribute_values.util.js';

class SpecicalProduct extends HTMLElement {
  connectedCallback() {
    const [img_href, id, caption, current_price, old_price] = get_default_product_attribute_values(this)
    const sale_percent = this.getAttribute('sale_percent');
    const stars = this.getAttribute('stars');
    const is_new = this.getAttribute('is_new');
    const is_favourite = this.getAttribute('is_favourite');

    this.innerHTML = `
    <div class='special-product'>
      <div class='special-product-content'>
        <button class='special-product-content__favourite-button button-outlined ${
          is_favourite ? 'button-outlined--active' : ''
        }'>
          ${favouriteSvg}
        </button>
        <div class='special-product-content__utils'>
          ${[
            { content: compareSvg, caption: 'compare' },
            { content: 'Add to card', caption: 'add-to-card' },
            { content: searchSvg, caption: 'search' },
          ]
            .map(
              ({ caption, content }) => `
              <button class='special-product-content__utils-${caption} button-outlined'>
                ${content}
              </button>`
            )
            .join('')}
        </div>

        <div class='special-product-content__labels'>
          ${!!sale_percent ? `<div class='special-product-content__labels-sale'> -${sale_percent}% </div>` : ''}
          ${!!is_new ? `<div class='special-product-content__labels-new'> New </div>` : ''}
        </div>

        <img src=${img_href} ></img>
      </div>
      <stars-feedback value=${stars}></stars-feedback>
      <div class='special-product__caption'>
        ${caption}
      </div>
      <div class='special-product__price'>
        <p class='special-product__price-current'>
          ${current_price}
        </p>
        ${!!old_price ? ` <p class='special-product__price-old>${old_price}</p>` : ''}
        </div>
      </div>
    </div>`;

    const addToCardButton = this.querySelector('.special-product-content__utils-add-to-card');
    addToCardButton.addEventListener('click', () => {
      const storage = window.sessionStorage;
      const currentCard = storage.getItem('basket');
      storage.setItem('basket', `${currentCard || ''},${id}`);
    });
  }
}
if (!customElements.get('special-product')) customElements.define('special-product', SpecicalProduct);
