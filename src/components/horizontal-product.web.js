import '@styles/_web-horizontal-product.scss';
import favouriteSvg from '@svgs/favourite.svg';
import compareSvg from '@svgs/compare.svg';
import basketSvg from '@svgs/basket.svg';
import searchSvg from '@svgs/search.svg';
import { get_default_product_attribute_values } from '@utils/get_default_product_attribute_values.util.js';
import { set_up_utils_of_product } from '@utils/set_up_utils_of_product.util.js';
import { set_up_product_propertyies } from '@utils/set_up_product_propertyies.util.js';

class HorizontalProduct extends HTMLElement {
  connectedCallback() {
    const [img_href, id, caption, current_price] = get_default_product_attribute_values(this);
    const description = this.getAttribute('description');

    set_up_product_propertyies(this, id);

    this.innerHTML = `
    <div class='horizontal-product'>
      <a class='horizontal-product__preview-img' href='product_details.html?${id}'>
        <img src=${img_href} ></img>
      </a>
      <div class='horizontal-product__content'>
        <div class='horizontal-product__content-title'>
          ${caption}
        </div>
        <p class='horizontal-product__content-price'>
          $${current_price}
        </p>
        <div class='horizontal-product__content-description'>
          ${description}
        </div>
      </div>
      <div class='horizontal-product__utils'>
      ${[
        { content: favouriteSvg, caption: 'favourite', isActive: this.is_favourite },
        { content: compareSvg, caption: 'compare', isActive: this.is_added_to_compare },
        { content: basketSvg, caption: 'add-to-card', isActive: this.is_added_to_basket },
        { content: searchSvg, caption: 'search', isActive: false },
      ].map_join(
        ({ caption, content, isActive }) => `
          <button class='horizontal-product__utils-${caption}  ${
          isActive ? 'horizontal-product__utils-item--active' : ''
        }'>
            ${content}
          </button>`
      )}
      </div>
    </div>
    `;

    const handleSetUp = set_up_utils_of_product(id, 'horizontal-product__utils').bind(this);
    handleSetUp();
  }
}
if (!customElements.get('horizontal-product')) customElements.define('horizontal-product', HorizontalProduct);
