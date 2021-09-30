import './header&footer';
import '@styles/shop.scss';
import '@styles/_breadcrumb.scss';
import '@components/double-range.web.js';
import { API_URL } from '@config/index';
import 'regenerator-runtime/runtime.js';
import '@components/special-product.web.js';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';

const get_all_products = async () => {
  const data = await fetch(`${API_URL}/products`);
  const allProductsArr = await data.json();

  set_shop_propertyies(allProductsArr);
  const shopProductsPaginationNode = document.querySelector('.shop__products-pagination');

  const paginationButtonArr = [...shopProductsPaginationNode.children];

  paginationButtonArr.forEach((el) => {
    el.addEventListener('click', () => {
      let updatedPageNumber;
      const currentPageNumber = +window.sessionStorage.getItem('pageNumber');

      if (currentPageNumber == el.name) return set_shop_propertyies(allProductsArr, currentPageNumber);

      const isDefaultBuuton = !isNaN(+el.name);

      paginationButtonArr.forEach((__) => {
        __.classList.remove('shop__products-pagination__button--active');
      });

      if (isDefaultBuuton) {
        updatedPageNumber = el.name;
        el.classList.add('shop__products-pagination__button--active');
      }

      if (el.name === 'prev-button') {
        updatedPageNumber = currentPageNumber - 1 + '';
        paginationButtonArr
          .find((_, searchingIdx) => searchingIdx === currentPageNumber - 1)
          ?.classList.add('shop__products-pagination__button--active');
      }

      if (el.name === 'next-button') {
        paginationButtonArr
          .find((_, searchingIdx) => searchingIdx === currentPageNumber + 1)
          ?.classList.add('shop__products-pagination__button--active');
        updatedPageNumber = currentPageNumber + 1 + '';
      }

      window.sessionStorage.setItem('pageNumber', updatedPageNumber);
      set_shop_propertyies(allProductsArr, updatedPageNumber);
    });
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

    // shop__products-row
    productsViewButttonNodesArr.forEach((el) => el.classList.remove('button--active'));

    window.localStorage.setItem('productsViewVariant', idx === 0 ? 'grid' : 'list');
    __.classList.add('button--active');
  });
});
