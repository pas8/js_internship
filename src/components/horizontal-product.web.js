import '@styles/_web-horizontal-product.scss';
import favouriteSvg from '@svgs/favourite.svg';
import compareSvg from '@svgs/compare.svg';
import basketSvg from '@svgs/basket.svg';
import searchSvg from '@svgs/search.svg';
import { get_default_product_attribute_values } from '@utils/get_default_product_attribute_values.util.js';
import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';

class HorizontalProduct extends HTMLElement {
  connectedCallback() {
    const [img_href, id, caption, current_price, ] = get_default_product_attribute_values(this);
    const description = this.getAttribute('description');

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
        { content: favouriteSvg, caption: 'favourite' },
        { content: compareSvg, caption: 'compare' },
        { content: basketSvg, caption: 'basket' },
        { content: searchSvg, caption: 'search' },
      ]
        .map(
          ({ caption, content }) => `
          <button class='horizontal-product__utils-${caption}'>
            ${content}
          </button>`
        )
        .join('')}
      </div>
    </div>
    `;

    const addToCardButton = this.querySelector('.horizontal-product__utils-basket');
    addToCardButton.addEventListener('click', () => {
      set_product_to_basket(id);
    });
  }
}
if (!customElements.get('horizontal-product')) customElements.define('horizontal-product', HorizontalProduct);
