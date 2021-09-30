import './header&footer';
import '@styles/shop.scss';
import '@styles/_breadcrumb.scss';
import '@components/double-range.web.js';
import { API_URL } from '@config/index';
import 'regenerator-runtime/runtime.js';
import '@components/special-product.web.js';
import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';

// let pageNumber =

const get_all_products = async () => {
  const data = await fetch(`${API_URL}/products`);
  const allProductsArr = await data.json();

  set_shop_propertyies(allProductsArr);
  const shopProductsPaginationNode = document.querySelector('.shop__products-pagination');

  const paginationButtonArr = [...shopProductsPaginationNode.children];

  paginationButtonArr.forEach((el) => {
    el.addEventListener('click', () => {
      let updatedPageNumber;
      const isDefaultBuuton = !isNaN(+el.name);
      const currentPageNumber = +window.sessionStorage.getItem('pageNumber');

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
      set_shop_propertyies(allProductsArr);
    });
  });
};
get_all_products();
