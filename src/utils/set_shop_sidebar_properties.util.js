import { set_up_on_click_of_all_childrens } from '@utils/set_up_on_click_of_all_childrens.util.js';
import { use_validation_of_siderbar_utils } from '@utils/use_validation_of_siderbar_utils.util.js';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';
import { set_shop_pagination_propertyies } from '@utils/set_shop_pagination_propertyies.util.js';
import filterSvg from '@svgs/filter.svg';
import categorySvg from '@svgs/category.svg';
import closeSvg from '@svgs/close.svg';

import 'regenerator-runtime/runtime.js';

window.filteringProps = {
  color: '',
  size: '',
};

window.isShopSidebarDialogOpen = false;

export const set_shop_sidebar_properties = async (arr) => {
  const sidebarProductCategoriesNode = document.querySelector('.sidebar-content-of-product-categories');
  const sidebaFilterByPriceSliderNode = document.querySelector('.sidebar-content-of-filter-by-price-double-slider');
  const sidebaFilterByColorNode = document.querySelector('.sidebar-content-of-filter-by-color');
  const sidebarContentOfFilterByPriceValueNode = document.querySelector('.sidebar-content-of-filter-by-price__value');
  const sidebarContentOfFilterBySize = document.querySelector('.sidebar-content-of-filter-by-size');
  const sidebarContainerOfFilterButtonNode = document.querySelector('.sidebar-container-of-filter-button');
  const sidebarDialogButtonNode = document.querySelector('.shop__products-utils__content-sidebar-dialog-button');
  const sidebarNode = document.querySelector('.shop__sidebar');

  sidebarDialogButtonNode.addEventListener('click', () => {
    if (!window.isShopSidebarDialogOpen) {
      sidebarDialogButtonNode.innerHTML = closeSvg;
      window.isShopSidebarDialogOpen = true;

      sidebarNode.classList.remove('shop__sidebar--closed');
      sidebarDialogButtonNode.classList.add('shop__products-utils__content-sidebar-dialog-button--active');
      return;
    }
    sidebarDialogButtonNode.classList.remove('shop__products-utils__content-sidebar-dialog-button--active');

    sidebarNode.classList.add('shop__sidebar--closed');

    window.isShopSidebarDialogOpen = false;
    sidebarDialogButtonNode.innerHTML = categorySvg;
  });

  const propertyies = await use_validation_of_siderbar_utils(arr);
  const [categoriesArr, colorsArr, sizeArr, max, min] = propertyies;

  sidebarProductCategoriesNode.innerHTML = `
  ${[{ id: 'all', name: 'All products' }, ...categoriesArr].map_join(
    ({ name, id }, i) =>
      `<div category-id='${id}' class='sidebar-content-of-product-categories__item  ${
        i === 0 ? 'sidebar-content-of-product-categories__item--active' : ''
      } '>${name} </div>`
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
      window.localStorage.setItem('pageNumber', 1);

      [...sidebarProductCategoriesNode.children].forEach((__) =>
        __.classList.remove('sidebar-content-of-product-categories__item--active')
      );
      el.classList.add('sidebar-content-of-product-categories__item--active');

      const categoryId = el.getAttribute('category-id');
      const allProductsArr =
        categoryId == 'all' ? arr : arr.filter(({ categories }) => categories.some(({ id }) => id == categoryId));

      set_shop_propertyies(allProductsArr, undefined, true);
      set_shop_pagination_propertyies(allProductsArr);
      // window.location.replace(el.textContent.toLowerCase());
    });
  });
};
