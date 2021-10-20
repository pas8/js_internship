import '@styles/payment_dialog.scss';
import IMask from 'imask';
import { use_toast } from '@utils/use_toast.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

const paymentCardNumberInputNode = document.querySelector('.payment_dialog-content__payment-methods__card-number');
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
  const paymentData = { date: date.value, cvc: cvc.value, card_number: cardNumber.value, status: 'open' };
  const [products] = get_basket();

  const [res, error] = await use_xml_http_request(
    'new_order',
    'POST',
    JSON.stringify({ contactData, paymentData, products })
  );
  if (!!error) return use_toast(error, 'error');

  window.localStorage.removeItem('basket');
  const basketNode = document.querySelector('.button-basket');
  basketNode.classList.remove('with-label');

  use_toast(res, 'info');
  return window.location.replace('/pages/shop.html');
});

closeButtonNode.addEventListener('click', () => {
  document.querySelector('.payment_dialog').classList.add('payment_dialog--closed');
});
