import { get_random_int } from '@utils/get_random_int.util.js';

export const set_up_feature_products_tabs = (tabpanelArr) => {
  const featureProductsTabPanel = document.querySelector('.feature-products-tab-panel');

  featureProductsTabPanel.innerHTML = `
  ${tabpanelArr.map_join(
    ({ name, productsArr }, idx) => `
      <p slot='tab' class='${idx === 0 ? 'selected' : ''}'> ${name}</p>
      <div slot='content' class='${idx === 0 ? 'selected' : ''}'>
        <div class='feature-products-glide container'>
          <svg class='slider-prev-button' id=${idx} viewBox='0 0 24 24'>
            <path d='M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'></path>
          </svg>
  
          <div class='feature-products-glide__track' style='transform:translateX(0px)' id={idx}>
            <div class='feature-products-glide__slides'>
              ${productsArr.map_join(
                ({ image, name, price, id }) =>
                  ` <div class='feature-products-glide__slide' ><special-product id='${id}'  img_href=${image}  sale_percent=${get_random_int(
                    8,
                    92
                  )} is_new='${true}' stars=${get_random_int(
                    0,
                    5
                  )} caption=${name} current_price=${price}></special-product></div>`
              )}
            </div>
          </div>
          <svg class='slider-next-button' id=${idx} viewBox='0 0 24 24'>
            <path d='M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
          </svg>
        </div>
      </div>
  `
  )}
  `;
};
