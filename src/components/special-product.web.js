import '@styles/_web-specical-products.scss';
import '@components/stars.web.js';
import favouriteSvg from '@svgs/favourite.svg';
import compareSvg from '@svgs/compare.svg';
import searchSvg from '@svgs/search.svg';
import { get_default_product_attribute_values } from '@utils/get_default_product_attribute_values.util.js';
import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';
import { get_basket } from '@utils/get_basket.util.js';

class SpecicalProduct extends HTMLElement {
  connectedCallback() {

    const [basketValue] = get_basket();
    const [img_href, id, caption, current_price, old_price] = get_default_product_attribute_values(this);

    const sale_percent = this.getAttribute('sale_percent');
    const stars = this.getAttribute('stars');
    let is_new = this.getAttribute('is_new');
    let is_favourite = this.getAttribute('is_favourite');
    let is_added_to_compare = this.getAttribute('is_favourite');

    this.is_added_to_basket = basketValue.includes(id)

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
            { content: compareSvg, caption: 'compare', isActive: is_added_to_compare },
            { content: 'Add to card', caption: 'add-to-card', isActive: this.is_added_to_basket },
            { content: searchSvg, caption: 'search', isActive: false },
          ]
            .map(
              ({ caption, content, isActive }) => `
              <button class='special-product-content__utils-${caption} button-outlined ${
                isActive ? 'special-product-content__utils-item--active' : ''
              }'>
                ${content}
              </button>`
            )
            .join('')}
        </div>

        <div class='special-product-content__labels'>
          ${!!sale_percent ? `<div class='special-product-content__labels-sale'> -${sale_percent}% </div>` : ''}
          ${!!is_new ? `<div class='special-product-content__labels-new'> New </div>` : ''}
        </div>
        <a href='product_details.html?${id}'>
          <img src=${img_href} ></img>
        </a>
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
      addToCardButton.classList.add('special-product-content__utils-item--active')
      set_product_to_basket(id);
    });
  }
}
if (!customElements.get('special-product')) customElements.define('special-product', SpecicalProduct);
