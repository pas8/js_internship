import './header&footer';
import '@styles/_breadcrumb.scss';
import '@styles/checkout.scss';
import '@styles/checkout.scss';
import './payment_dialog';
import { use_toast } from '@utils/use_toast.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import { get_random_int } from '@utils/get_random_int.util.js';
import phoneSvg from '@svgs/phone.svg';
import IMask from 'imask';

window.localStorage.setItem('isGiveInfo', 'false');

const contactEmailOrPhoneInputNode = document.querySelector('.form-contact-info__utils-email-or-phone-input');
const contactPostalCodeInputNode = document.querySelector('.form-contact-info__utils-postal-code-input');
const contactFirstNameInputNode = document.querySelector('.form-contact-info__utils-first-name-input');
const contactLastNameInputNode = document.querySelector('.form-contact-info__utils-last-name-input');
const givemeinfoInputNodeArr = document.querySelectorAll('.givemeinfo-input');

givemeinfoInputNodeArr.forEach((el) => {
  el.addEventListener('change', (e) => {
    e.preventDefault();
    let isGiveInfo = JSON.parse(window.localStorage.getItem('isGiveInfo'));
    window.localStorage.setItem('isGiveInfo', !isGiveInfo);

    givemeinfoInputNodeArr.forEach((checkBox) => (checkBox.checked = isGiveInfo));
  });
});
const contactAdressInputNode = document.querySelector('.form-contact-info__utils-adress-input');
const contactUtilsAdressAdditionInputNode = document.querySelector('.form-contact-info__utils-adress-adittional-input');
const contactCitySelectNode = document.querySelector('.form-contact-info__utils-city-select');
const contactCountryOrRegionInputNode = document.querySelector('.form-contact-info__utils-country-or-region-input');

const buttonMoveToPaymentNode = document.querySelector('.button-move-to-payment');
const paymentDialogNode = document.querySelector('.payment_dialog');

const buttonChangeContactVariantNode = document.querySelector(
  '.form-contact-info__utils-button-change-contact-variant'
);
let emailSvg = null;

const emailMask = /^\S*@?\S*$/;
const phoneMask = '+{38}(000)000-00-00';
const onlyLettersMask = /[a-z]/gi;
const emailOrPhone = IMask(contactEmailOrPhoneInputNode, {
  mask: [
    {
      mask: phoneMask,
    },
    {
      mask: emailMask,
    },
  ],
});

const firstName = IMask(contactFirstNameInputNode, { mask: onlyLettersMask });
const lastName = IMask(contactLastNameInputNode, { mask: onlyLettersMask });
const adress = IMask(contactAdressInputNode, { mask: onlyLettersMask });
const contryOrRegion = IMask(contactCountryOrRegionInputNode, { mask: onlyLettersMask });

emailOrPhone.on('accept', () => {
  if (!emailSvg) emailSvg = buttonChangeContactVariantNode.innerHTML;
  const isValueLooksLikePhoneNumber = emailOrPhone.value.startsWith('+');
  buttonChangeContactVariantNode.innerHTML = isValueLooksLikePhoneNumber ? phoneSvg : emailSvg;
});

buttonChangeContactVariantNode.addEventListener('click', () => {
  navigator.clipboard
    .writeText(emailOrPhone.value)
    .then(() => {
      use_toast('Copying to clipboard was successful!', 'info');
    })
    .catch(() => {
      use_toast('Something went wrong', 'error');
    });
});

const postalCode = IMask(contactPostalCodeInputNode, { mask: /^[1-6]\d{0,5}$/ });

buttonMoveToPaymentNode.addEventListener('click', () => {
  if (
    !(
      (emailOrPhone.value.startsWith('+') && emailOrPhone.value.length === 17) ||
      !!emailOrPhone.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    )
  )
    return use_toast('Please fill email or phone   field', 'error');
  if (contactCitySelectNode.value === 'placeholder') return use_toast('Please fill city field', 'error');
  if (firstName.value.length < 1) return use_toast('Please fill first name field', 'error');
  if (lastName.value.length < 1) return use_toast('Please fill last name field', 'error');
  if (adress.value.length < 1) return use_toast('Please fill adress field', 'error');
  if (contryOrRegion.value.length < 1) return use_toast('Please fill contryOrRegion field', 'error');
  if (contactCitySelectNode.value === 'placeholder') return use_toast('Please fill city field', 'error');

  if (contactUtilsAdressAdditionInputNode.value.length < 1)
    return use_toast('Please fill addition info field', 'error');

  if (postalCode.value.length !== 6) return use_toast('Please fill  postal code  field', 'error');

  paymentDialogNode.classList.remove('payment_dialog--closed');
});

const checkoutSubtotalNode = document.querySelector('.checkout-subtotal-value');
const checkoutTaxesNode = document.querySelector('.checkout-taxes-value');
const checkoutTotalNode = document.querySelector('.checkout-total-value');

const [basketValue, basketLength] = get_basket();

//!hard code
const subtotatlValue = get_random_int(16, 42);
const taxeslValue = get_random_int(4, 8);

checkoutSubtotalNode.innerHTML = `$${subtotatlValue}.0`;
checkoutTaxesNode.innerHTML = `$${taxeslValue}.0`;
checkoutTotalNode.innerHTML = `$${taxeslValue + subtotatlValue}.0`;
