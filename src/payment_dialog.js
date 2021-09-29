import '@styles/payment_dialog.scss';
import IMask from 'imask';
import { use_toast } from '@utils/use_toast.util.js';



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

confirmOrderButton.addEventListener('click', () => {
  console.log();

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
  return use_toast(`Card data is correct, redirecting `, 'info');
});


closeButtonNode.addEventListener('click', () => {
  document.querySelector('.payment_dialog').classList.add('payment_dialog--closed');
});
