import '@styles/_web-specical-products.scss';
import '@components/stars.web.js';
import favouriteSvg from '@svgs/favourite.svg';
import compareSvg from '@svgs/compare.svg';
import searchSvg from '@svgs/search.svg';
import { get_default_product_attribute_values } from '@utils/get_default_product_attribute_values.util.js';
import { set_up_utils_of_product } from '@utils/set_up_utils_of_product.util.js';

import { set_up_product_propertyies } from '@utils/set_up_product_propertyies.util.js';

class SpecicalProduct extends HTMLElement {
  connectedCallback() {
    const [img_href, id, caption, current_price, old_price] = get_default_product_attribute_values(this);

    const sale_percent = this.getAttribute('sale_percent');
    const stars = this.getAttribute('stars');
    let is_new = this.getAttribute('is_new');

    set_up_product_propertyies(this, id);

    this.innerHTML = `
    <div class='special-product'>
      <div class='special-product-content'>
        <button class='special-product-content__favourite-button button-outlined special-product-content__utils-favourite ${
          this.is_favourite ? 'special-product-content__utils-item--active' : ''
        }'>
          ${favouriteSvg}
        </button>
        <div class='special-product-content__utils'>
          ${[
            { content: compareSvg, caption: 'compare', isActive: this.is_added_to_compare },
            { content: 'Add to card', caption: 'add-to-card', isActive: this.is_added_to_basket },
            { content: searchSvg, caption: 'search', isActive: false },
          ].map_join(
            ({ caption, content, isActive }) => `
              <button class='special-product-content__utils-${caption} button-outlined ${
              isActive ? 'special-product-content__utils-item--active' : ''
            }'>
                ${content}
              </button>`
          )}
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

    const handleSetUp = set_up_utils_of_product(id, 'special-product-content__utils').bind(this);
    handleSetUp();
  }
}
if (!customElements.get('special-product')) customElements.define('special-product', SpecicalProduct);
