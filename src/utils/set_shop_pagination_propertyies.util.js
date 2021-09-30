import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';

export const set_shop_pagination_propertyies = (allProductsArr) => {
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
