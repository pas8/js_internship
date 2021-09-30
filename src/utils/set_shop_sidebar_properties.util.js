import { use_validation_of_siderbar_utils } from '@utils/use_validation_of_siderbar_utils.util.js';

export const set_shop_sidebar_properties = (arr) => {
  const sidebarProductCategoriesNode = document.querySelector('.sidebar-content-of-product-categories');
  const sidebaFilterByPriceSliderNode = document.querySelector('.sidebar-content-of-filter-by-price-double-slider');
  const sidebaFilterByColorNode = document.querySelector('.sidebar-content-of-filter-by-color');
  const sidebarContentOfFilterByPriceValueNode = document.querySelector('.sidebar-content-of-filter-by-price__value');
  const sidebarContentOfFilterBySize = document.querySelector('.sidebar-content-of-filter-by-size');
  const sidebarContainerOfFilterButtonNode = document.querySelector('.sidebar-container-of-filter-button');

  const [categoriesArr, colorsArr, sizeArr, max, min] = use_validation_of_siderbar_utils(arr);
  sidebarProductCategoriesNode.innerHTML = `
  ${categoriesArr
    .map(
      (el) =>
        `<div class='sidebar-content-of-product-categories__item'>${el
          .split('')
          .map((__, idx) => (idx === 0 ? __.toUpperCase() : __))
          .join('')} </div>`
    )
    .join('')}
  `;
  sidebaFilterByColorNode.innerHTML = `
  ${colorsArr
    .map((el) => `<div class='sidebar-content-of-filter-by-color__item' style='background:${el}'> </div>`)
    .join('')}
  `;

  sidebarContentOfFilterBySize.innerHTML = `
  ${sizeArr.map((el) => `<button class='sidebar-content-of-filter-by-size__item'>${el}kg </button>`).join('')}
  `;

  sidebarContentOfFilterByPriceValueNode.innerHTML = `<div>$${min} - $${max} </div>`;

  sidebaFilterByPriceSliderNode.innerHTML = `<double-range step='${~~Math.ceil(
    max / 100
  )}' max='${max}' min='${min}'></double-range>`;

  sidebarContainerOfFilterButtonNode.innerHTML = `<button class='sidebar__filter-button button--contained ' > Filter </button>`;
};
