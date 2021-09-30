import './header&footer';
import '@styles/shop.scss';
import '@styles/_breadcrumb.scss';
import '@components/double-range.web.js';
import '@components/special-product.web.js';
import '@components/horizontal-product.web.js';
import 'regenerator-runtime/runtime.js';

import { API_URL } from '@config/index';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_shop_sidebar_properties } from '@utils/set_shop_sidebar_properties.util.js';
import { set_shop_pagination_propertyies } from '@utils/set_shop_pagination_propertyies.util.js';

Array.prototype.map_join = function (func) {
  return this.map(func).join('');
};

const get_all_products = async () => {
  const data = await fetch(`${API_URL}/products`);
  const allProductsArr = await data.json();

  set_shop_propertyies(allProductsArr);
  set_shop_sidebar_properties(allProductsArr);
  set_shop_pagination_propertyies(allProductsArr);

  set_up_search(allProductsArr,[
    document.querySelector('.shop__sidebar-search__result'),
    document.querySelector('.shop__sidebar-search__svg-container'),
    document.querySelector('.shop__sidebar-search__input'),
  ]);
};
get_all_products();

// const productsContainer
const productsViewButttonNodesArr = [
  document.querySelector('.shop__products-utils__content-grid-view-button'),
  document.querySelector('.shop__products-utils__content-list-view-button'),
];

productsViewButttonNodesArr.forEach((__, idx) => {
  const viewVariant = window.localStorage.getItem('productsViewVariant');
  viewVariant === 'grid' && idx === 0 && __.classList.add('button--active');
  viewVariant === 'list' && idx === 1 && __.classList.add('button--active');
  __.addEventListener('click', () => {
    const productsContainerNode = document.querySelector('.shop__products-row');

    productsContainerNode.innerHTML = productsContainerNode.outerHTML.replaceAll(
      productsContainerNode.outerHTML.includes('special-product') ? 'special-product' : 'horizontal-product',
      !productsContainerNode.outerHTML.includes('special-product') ? 'special-product' : 'horizontal-product'
    );

    productsViewButttonNodesArr.forEach((el) => el.classList.remove('button--active'));

    window.localStorage.setItem('productsViewVariant', idx === 0 ? 'grid' : 'list');
    __.classList.add('button--active');
  });
});

// const sidebarProductCategoriesNode = document.querySelector('.sidebar-content-of-product-categories');
