import { get_basket } from '@utils/get_basket.util.js';

export const to_delete_item_from_basket = (id) => {
  const basketNode = document.querySelector('.button-basket');

  const [basketValue] = get_basket();

  const idxToRemove = basketValue.findIndex((__) => __ == id);
  const new_basket = basketValue?.filter((__, idx) => idx !== idxToRemove);
  const new_basket_str = new_basket?.join(' ');

  window.localStorage.setItem('basket', new_basket_str);
  basketNode.setAttribute('data-label', new_basket?.length);
};
