import '@styles/payment_dialog.scss';
import IMask from 'imask';
import { use_toast } from '@utils/use_toast.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import { use_check_for_empty_product_ids_arr } from '@utils/use_check_for_empty_product_ids_arr.util.js';
import { get_sum_from_arr } from '@utils/get_sum_from_arr.util.js';
import { get_user_order_html } from '@utils/get_user_order_html.util.js';
import { get_user_token } from '@utils/get_user_token.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import '@styles/__user_order.scss';

const paymentTitleNode = document.querySelector('.payment_dialog-content__header-title');
const totalValue = `$42.0`;
paymentTitleNode.innerHTML = totalValue;

const paymentCardNumberInputNode = document.querySelector('.payment_dialog-content__payment-methods__card-number');
const main_node = document.querySelector('.payment_dialog-content__payment-methods');
const paymentCardCVCInputNode = document.querySelector('.payment_dialog-content__payment-methods__card-cvc');
const paymentCardDateInputNode = document.querySelector('.payment_dialog-content__payment-methods__card-date');
const closeButtonNode = document.querySelector('.payment_dialog-content__header-close-button');

const cardNumber = IMask(paymentCardNumberInputNode, {
  mask: '0000 / 0000 / 0000 / 0000',
  overwrite: true,
  autofix: true,
});

const cvc = IMask(paymentCardCVCInputNode, { mask: '000' });
const date = IMask(paymentCardDateInputNode, { mask: '00 / 00' });

const confirmOrderButton = document.querySelector('.payment_dialog-content__payment-methods__card-confirm');

confirmOrderButton.addEventListener('click', async () => {
  if (cardNumber.value.length < 16) {
    return use_toast('Card value  is incorrect', 'error');
  }
  const [month, year] = date.value.split(' / ');
  if (!+month || +month > 13) {
    return use_toast('Month value is incorrect', 'error');
  }
  if (+year > `${new Date().getFullYear()}`.slice(2)) {
    return use_toast('Year value is incorrect', 'error');
  }
  if (cvc.value.length < 3) {
    return use_toast('CVC value   is incorrect', 'error');
  }

  const contactData = JSON.parse(window.localStorage.getItem('contactData'));
  const paymentData = { date: date.value, cvc: cvc.value, card_number: cardNumber.value };
  const [products] = get_basket();
  const token = get_user_token();

  const [json, error] = await use_xml_http_request(
    'new_order',
    'POST',
    JSON.stringify({ contactData, paymentData, products, token })
  );
  if (!!error) return use_toast(error, 'error');

  const id = JSON.parse(json);

  use_toast('Order was added', 'info');
  paymentTitleNode.innerHTML = 'Thanks :)';

  const get_validated_products = async (products) => {
    const _products = await use_check_for_empty_product_ids_arr(products, () => []);

    if (!!_products[1]) return { ...products, _products: [] };
    _products[1] = get_sum_from_arr(
      _products?.[2].map(({ id, count }) => +_products[0].find((__) => __?.id === id)?.price * count)
    );
    return _products;
  };
  const _products = await get_validated_products(get_basket()[0]);

  const user_order_props = { _products, status: 'Open', id };
  main_node.innerHTML = `<div>${get_user_order_html(user_order_props)}</div>`;

  window.localStorage.removeItem('basket');
  const basketNode = document.querySelector('.button-basket');
  basketNode.classList.remove('with-label');
  // return window.location.replace('/pages/shop.html');
});

closeButtonNode.addEventListener('click', () => {
  document.querySelector('.payment_dialog').classList.add('payment_dialog--closed');
});
