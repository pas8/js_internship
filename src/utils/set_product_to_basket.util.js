import { get_basket } from '@utils/get_basket.util.js';

export const set_product_to_basket = (id) => {
  const [basket, basketLength] = get_basket();
  const storage = window.localStorage;
  
  storage.setItem('basket', !!basket ? [...basket, id].join(' ') : [id]);
  const basketNode = document.querySelector('.button-basket');
  basketNode.classList.add('with-label');
  basketNode.setAttribute('data-label', (basketLength || 0) + 1);
};
