import '@components/stars.web.js';
import '@styles/_web-product-details.scss';
class ProductDetails extends HTMLElement {
  constructor() {
    super();
    this.tabContentClassName = 'product-details-content__info-extended__tabs-content';
    this.imgsArr = ['90249b7fa32e303d2230923fa60540b6.jpeg'];
    this.activeImgUrl = '90249b7fa32e303d2230923fa60540b6.jpeg';
    this.starsValue = +'4';
    this.tabIdx = 0;
  }

  connectedCallback() {
    // const desciptionContent = `Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate at dolor et, malesuada ultrices nisi. Ut
    // varius ex ut purus porttitor, a facilisis orci condimentum. Nullam in elit et sapien ornare pellentesque
    // at ac lorem. Cras suscipit, sapien in pellentesque hendrerit, dolor quam ornare nisl, vitae tempus nibh
    // urna eget sem. Duis non interdum arcu, sit amet pellentesque odio. In sit amet aliquet augue.
    // Etiam cursus condimentum vuputate. Nulla nisi orci, vulputate at dolor et, malesuada ultrices nisi. Ut
    // varius ex ut purus porttitor, a facilisis orci condimentum. Nullam in elit et sapien ornare pellentesque
    // at ac lorem. Cras suscipit, sapien in pellentesque hendrerit, dolor quam ornare nisl, vitae tempus nibh
    // urna eget sem. Duis non interdum arcu, sit amet pellentesque odio. In sit amet aliquet augue.`;
    // const h = [desciptionContent];

    this.innerHTML = `
      <div class='product-details-content'>
      <div class='product-details-content__product-gallery'>
        <div class='product-details-content__product-gallery__main-img'>
          <img src=${this.activeImgUrl} />
        </div>
      </div>
      <div class='product-details-content__info'>
        <div class='product-details-content__info-acticle'>
          <div class='product-details-content__info-acticle__caption'>Placeholder</div>
          <div class='product-details-content__info-acticle__stars'>
            <stars-feedback value=${this.starsValue}></stars-feedback>
            <p class='product-details-content__info-acticle__stars-denotation'>( 6 customer reviews )</p>
          </div>
          <div class='product-details-content__info-acticle__price'>$12.0</div>
        </div>
        <div class='product-details-content__info-denotation'>
          <div class='product-details-content__info-denotation__text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus
            vel facilisis. Etiam cursus condimentum vulputate.
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
              <svg class='product-details-content__info-utils__quantity-counter__button-less' viewBox='0 0 24 24'>
                <path d='M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'></path>
              </svg>
              <p class='product-details-content__info-utils__quantity-counter__value'>10</p>
              <svg class='product-details-content__info-utils__quantity-counter__button-more' viewBox='0 0 24 24'>
                <path d='M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
              </svg>
            </div>
          </div>
          <div class='product-details-content__info-utils__add-to-cart-button button-outlined'> Add to cart</div>
          <button class='product-details-content__info__utils-favourite button-outlined button'>
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'></path>
            </svg>
          </button>
          <button class='product-details-content__info__utils-compare button-outlined button'>
            <svg viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z'
              ></path>
            </svg>
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
              Reviews (5)
            </button>
          
            </div>
        </div>
      </div>
      </div>
`;
//!to fix
// ${h.map(({ caption, content }, idx) => {
//   return `
//     <div class='product-details-content__info-extended__tabs-content product-details-content__info-extended__tabs-content--desciption'>
//       ${content}
//     </div>
//     `;
// })}
    const tabNodes = document.querySelectorAll('');

    tabNodes.forEach((__, idx) => {
      __.addEventListener('click', () => {
        const isCurrentTabSelected = this.tabIdx === idx;
        if (isCurrentTabSelected) return;
        const activeClass = `${this.tabContentClassName}--active`;
        tabNodes.forEach((el) => el.classList.remove(activeClass));
        __.classList.add(activeClass);
      });
    });
  }
}

customElements.define('product-details', ProductDetails);
