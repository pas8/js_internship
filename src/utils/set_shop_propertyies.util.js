import { use_validation_of_products } from '@utils/use_validation_of_products.util.js';
import arrowNextSvg from '@svgs/arrow_next.svg';
import arrowPrevSvg from '@svgs/arrow_prev.svg';

const paginationPrevButton = `<button class='shop__products-pagination__button' name='prev-button'>${arrowPrevSvg} </button>`;
const paginationNextButton = `<button class='shop__products-pagination__button' name='next-button'>${arrowNextSvg} </button>`;

export const set_shop_propertyies = (allProductsArr, updatedPageNumber,isUpdatePagination) => {
  const shopProductsPaginationNode = document.querySelector('.shop__products-pagination');

  const shopProductsUtilsResultCounterNode = document.querySelector('.shop__products-utils__result-counter');
  const shopProductsContainerNode = document.querySelector('.shop__products-row');

  const pageNumber = updatedPageNumber || +window.sessionStorage.getItem('pageNumber') || 1;

  const PRODUCTS_LENGTH_PER_PAGE = 6;
  const END_PRODUCT_IDX = pageNumber * PRODUCTS_LENGTH_PER_PAGE;
  const START_PRODUCT_IDX = END_PRODUCT_IDX - PRODUCTS_LENGTH_PER_PAGE;

  const LAST_PAGE_NUMBER = Math.ceil(allProductsArr.length / PRODUCTS_LENGTH_PER_PAGE);

  const shopProductsHtml = use_validation_of_products(allProductsArr, END_PRODUCT_IDX, START_PRODUCT_IDX);

  shopProductsContainerNode.innerHTML = shopProductsHtml;

  shopProductsUtilsResultCounterNode.innerHTML = `<span>Showing ${START_PRODUCT_IDX + 1} - ${
    END_PRODUCT_IDX > allProductsArr.length ? allProductsArr.length : END_PRODUCT_IDX
  } of ${allProductsArr.length} results </span>`;

  const paginationButtonArr = [...shopProductsPaginationNode.children];

  if (pageNumber == 1 && paginationButtonArr[0].name === 'prev-button') {
    paginationButtonArr[0].remove();
  }

  if (paginationButtonArr.every(({ name }) => name !== 'prev-button')) {
    shopProductsPaginationNode.insertAdjacentHTML('afterbegin', paginationPrevButton);
  }
  if (pageNumber == LAST_PAGE_NUMBER && paginationButtonArr[paginationButtonArr.length - 1].name === 'next-button') {
    paginationButtonArr[paginationButtonArr.length - 1].remove();
  }

  if (paginationButtonArr.every(({ name }) => name !== 'next-button')) {
    shopProductsPaginationNode.insertAdjacentHTML('beforeend', paginationNextButton);
  }

  if ([...shopProductsPaginationNode.children].length > 3 && !isUpdatePagination) return;

  const pagintaionButtonsArr = Array.from(
    { length: LAST_PAGE_NUMBER },
    (__, idx) =>
      `<button  name='${idx + 1}'   class='shop__products-pagination__button ${
        pageNumber === idx + 1 ? 'shop__products-pagination__button--active' : ''
      }'>${idx + 1} </button>`
  );
  shopProductsPaginationNode.innerHTML = [
    pageNumber != 1 ? paginationPrevButton : '',
    ...pagintaionButtonsArr,
    pageNumber != LAST_PAGE_NUMBER ? paginationNextButton : '',
  ].join('');
};
