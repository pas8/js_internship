import './header&footer';
import '@styles/shop.scss';
import '@styles/_breadcrumb.scss';
import '@components/double-range.web.js';
import '@components/special-product.web.js';
import '@components/horizontal-product.web.js';
import 'regenerator-runtime/runtime.js';

import closeSvg from '@svgs/close.svg';
import searchSvg from '@svgs/search.svg';
import { API_URL } from '@config/index';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';
import { set_shop_sidebar_properties } from '@utils/set_shop_sidebar_properties.util.js';
import { use_debounce } from '@utils/use_debounce.util.js';
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

  const searchResultContainerNode = document.querySelector('.shop__sidebar-search__result');
  const searchSvgContainerNode = document.querySelector('.shop__sidebar-search__svg-container');
  const searchInputNode = document.querySelector('.shop__sidebar-search__input');

  searchInputNode.addEventListener(
    'input',
    use_debounce(
      function () {
        searchSvgContainerNode.innerHTML = searchSvg;
        if (!this.value) return (searchResultContainerNode.style.display = 'none');
        const resultsArr = allProductsArr.map_join(({ title, id, image }) => {
          return title.startsWith(this.value)
            ? `<a href='product_details.html?${id}'>
          <img src=${image} ></img>
          <p> ${title} </p> </a> `
            : '';
        });
        if (!resultsArr.length) return (searchResultContainerNode.style.display = 'none');
        searchSvgContainerNode.innerHTML = closeSvg;
        searchResultContainerNode.style.display = 'flex';

        searchResultContainerNode.innerHTML = resultsArr;
      },
      200,
      true
    )
  );
  searchSvgContainerNode.addEventListener('click', (e) => {
    if (!![...e.path]?.find((el) => el.classList?.[0] === 'closeSvg')) {
      searchInputNode.value = '';
      searchSvgContainerNode.innerHTML = searchSvg;
      searchResultContainerNode.style.display = 'none';

      return;
    }
    searchInputNode.focus();
  });
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
