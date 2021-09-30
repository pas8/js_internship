import { set_up_on_click_of_all_childrens } from '@utils/set_up_on_click_of_all_childrens.util.js';
import { use_validation_of_siderbar_utils } from '@utils/use_validation_of_siderbar_utils.util.js';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';
import { set_shop_pagination_propertyies } from '@utils/set_shop_pagination_propertyies.util.js';
import { API_URL } from '@config/index';
import filterSvg from '@svgs/filter.svg';

import 'regenerator-runtime/runtime.js';

window.filteringProps = {
  color: '',
  size: '',
};

export const set_shop_sidebar_properties = (arr) => {
  const sidebarProductCategoriesNode = document.querySelector('.sidebar-content-of-product-categories');
  const sidebaFilterByPriceSliderNode = document.querySelector('.sidebar-content-of-filter-by-price-double-slider');
  const sidebaFilterByColorNode = document.querySelector('.sidebar-content-of-filter-by-color');
  const sidebarContentOfFilterByPriceValueNode = document.querySelector('.sidebar-content-of-filter-by-price__value');
  const sidebarContentOfFilterBySize = document.querySelector('.sidebar-content-of-filter-by-size');
  const sidebarContainerOfFilterButtonNode = document.querySelector('.sidebar-container-of-filter-button');

  const [categoriesArr, colorsArr, sizeArr, max, min] = use_validation_of_siderbar_utils(arr);


  sidebarProductCategoriesNode.innerHTML = `
  ${['All products', ...categoriesArr].map_join(
    (el, i) =>
      `<div class='sidebar-content-of-product-categories__item ${
        i === 0 ? 'sidebar-content-of-product-categories__item--active' : ''
      } '>${el.split('').map_join((__, idx) => (idx === 0 ? __.toUpperCase() : __))} </div>`
  )}
  `;
  sidebaFilterByColorNode.innerHTML = `
  ${colorsArr.map_join(
    (el) => `<div class='sidebar-content-of-filter-by-color__item' style='background:${el}'> </div>`
  )}
  `;
  set_up_on_click_of_all_childrens(
    sidebaFilterByColorNode,
    'sidebar-content-of-filter-by-color__item--active',
    (el) => {
      window.filteringProps.color = el.style.background;
    }
  );

  sidebarContentOfFilterBySize.innerHTML = `
  ${sizeArr.map_join((el) => `<button class='sidebar-content-of-filter-by-size__item'> ${el}kg </button>`)}
  `;

  set_up_on_click_of_all_childrens(
    sidebarContentOfFilterBySize,
    'sidebar-content-of-filter-by-size__item--active',
    (el) => {
      window.filteringProps.size = parseInt(el.textContent);
    }
  );

  sidebarContentOfFilterByPriceValueNode.innerHTML = `<div>$${min} - $${max} </div>`;

  sidebaFilterByPriceSliderNode.innerHTML = `<double-range step='${~~Math.ceil(
    max / 100
  )}' max='${max}' min='${min}'></double-range>`;

  sidebarContainerOfFilterButtonNode.innerHTML = `<button class='sidebar__filter-button button--contained'> ${filterSvg} Filter</button>`;
  sidebarContainerOfFilterButtonNode.children[0].addEventListener('click', () => {
    const [, { value: minValue }, { value: maxValue }] = sidebaFilterByPriceSliderNode.children[0].children[0].children;
    window.filteringProps.price = [minValue, maxValue];

    const filteredArr = arr.filter(
      ({ price }) => price >= window.filteringProps.price[0] && price <= window.filteringProps.price[1]
    );
    set_shop_propertyies(filteredArr, undefined, true);
    set_shop_pagination_propertyies(filteredArr);
  });

  [...sidebarProductCategoriesNode.children].forEach((el) => {
    el.addEventListener('click', async () => {
      window.sessionStorage.setItem('pageNumber', 1);

      [...sidebarProductCategoriesNode.children].forEach((__) =>
        __.classList.remove('sidebar-content-of-product-categories__item--active')
      );
      el.classList.add('sidebar-content-of-product-categories__item--active');
      const data = await fetch(
        !el.textContent.startsWith('All')
          ? `${API_URL}/products/category/${el.textContent.toLowerCase()}`
          : `${API_URL}/products`
      );
      const allProductsArr = await data.json();
      set_shop_propertyies(allProductsArr, undefined, true);
      set_shop_pagination_propertyies(allProductsArr);
      // window.location.replace(el.textContent.toLowerCase());
    });
  });
};
