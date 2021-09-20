import '@styles/_web-specical-products.scss'



class SpecicalProduct extends HTMLElement {
  connectedCallback() {
    const sale_percent = this.getAttribute('sale_percent');
    const img_href = this.getAttribute('img_href');
    const stars = this.getAttribute('stars');
    const caption = this.getAttribute('caption');
    const is_new = this.getAttribute('is_new');
    const is_favourite = this.getAttribute('is_favourite');
    const current_price = this.getAttribute('current_price');
    const old_price = this.getAttribute('old_price');

    this.innerHTML = `<div class='special-product'>
    <div class='special-product-content'>
    <button class='special-product-content__favourite-button  button-outlined ${
      is_favourite ? 'button-outlined--active' : ''
    }'>
    <svg  viewBox="0 0 24 24" aria-hidden="true" ><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
</button>
      <div class='special-product-content__utils'>
        <button class='special-product-content__utils-compare button-outlined'>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
          </svg>
        </button>
        <button class='special-product-content__utils-add-to-card button-outlined'>
          Add to card
        </button>
        <button class='special-product-content__utils-search button-outlined'>
          <svg  viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>

      </div>

      <div class='special-product-content__labels'>
    ${!!sale_percent ? `<div class='special-product-content__labels-sale'> -${sale_percent}% </div>` : ''}
    ${!!is_new ? `<div class='special-product-content__labels-new'> New </div>` : ''}
    </div>

    <img src=${img_href}/>
    </div>

      <div class='special-product__stars'>
      ${Array(5)
        .fill(null)
        .map(
          (__, idx) =>
            `<svg viewBox='0 0 24 24'>
            <path
              fill=${+stars <= idx ? 'none' : 'currentColor'}
              stroke='currentColor'
              d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z'
            ></path>
          </svg>`
        )
        .join('')}
      </div>
      <div class='special-product__caption'>
      ${caption}
      </div>

      <div class='special-product__price'>
        <p class='special-product__price-current'>
        ${current_price}
        </p>
        ${
          !!old_price
            ? ` <p class='special-product__price-old>
        ${old_price}
        </p>`
            : ''
        }
      </div>
      </div>
    </div>`;
  }
}
customElements.define('special-product', SpecicalProduct);