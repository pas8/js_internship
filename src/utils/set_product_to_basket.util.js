import { get_basket } from '@utils/get_basket.util.js';

export const set_product_to_basket = (id) => {
  const [basket, basketLength] = get_basket();

// console.log([...basket].includes(id))
  const storage = window.sessionStorage;
  storage.setItem('basket', !!basket ? [...basket, id].join(' ') : [id]);
  const basketNode = document.querySelector('.button-basket');
  basketNode.setAttribute('data-label', basketLength + 1);
};
