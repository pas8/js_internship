import './header&footer';
import '@styles/_breadcrumb.scss';
import '@styles/checkout.scss';

import IMask from 'imask';

const contactEmailOrPhoneInputNode = document.querySelector('.form-contact-info__utils-email-or-phone-input');
const contactPostalCodeInputNode = document.querySelector('.form-contact-info__utils-postal-code-input');
const contactFirstNameInputNode = document.querySelector('.form-contact-info__utils-first-name-input');
const contactLastNameInputNode = document.querySelector('.form-contact-info__utils-last-name-input');

const contactAdressInputNode = document.querySelector('.form-contact-info__utils-adress-input');
const contactUtilsAdressAdditionInputNode = document.querySelector('.form-contact-info__utils-adress-adittional-input');
const contactCityInputNode = document.querySelector('.form-contact-info__utils-city-input');
const contactcountryOrRegionInputNode = document.querySelector('.form-contact-info__utils-country-or-region-input');

const submitButtonNode = document.querySelector('.submit-order-button');

const buttonChangeContactVariantNode = document.querySelector(
  '.form-contact-info__utils-button-change-contact-variant'
);
let emailSvg = null;
const phoneSvg = `
<svg viewBox="0 0 24 24" ><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"></path></svg>

`;
let isContactVariantEmail = true;

const emailMask = /^\S*@?\S*$/;
const phoneMask = '+{38}(000)000-00-00';

buttonChangeContactVariantNode.addEventListener('click', () => {
  if (!emailSvg) emailSvg = buttonChangeContactVariantNode.innerHTML;

  isContactVariantEmail = !isContactVariantEmail;
  buttonChangeContactVariantNode.innerHTML = isContactVariantEmail ? phoneSvg : emailSvg;
});

IMask(contactEmailOrPhoneInputNode, {
  mask: [
    {
      mask: phoneMask,
    },
    {
      mask: emailMask,
    },
  ],
});

const postalCode = IMask(contactPostalCodeInputNode, { mask: /^[1-6]\d{0,5}$/ });

submitButtonNode.addEventListener('click', () => {
  console.log({ postalCode: postalCode.value });
});

const buttonChangeContactVariantNode = document.querySelector('.button-move-to-payment')


// const handleValidateEmail = (value) => {
//   if (/^[a-z0-9_\.-]+$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
//   if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value)) return true;
//   return false;
// };
// console.log(handleValidateEmail('5342w522332@fmail.comm'))