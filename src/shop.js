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

      set_shop_propertyies(allProductsArr, updatedPageNumber);

      // if (paginationButtonArr.every(({ name }) => name !== 'prev-button')) {
      // }
      // if (updatedPageNumber == 1 && paginationButtonArr[0].name === 'prev-button') {
      //   paginationButtonArr[0].remove();
      // } else {
      //   shopProductsPaginationNode.insertAdjacentHTML('afterbegin', paginationPrevButton);
      // }

      window.sessionStorage.setItem('pageNumber', updatedPageNumber);
    });
  });
};
get_all_products();
