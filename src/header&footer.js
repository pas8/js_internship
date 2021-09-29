import '@styles/_header.scss';
import '@styles/_footer.scss';
import '@styles/_basket_details.scss';
import '@components/social-utils.web.js';
// import { get_random_img } from '@utils/get_random_img.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import { use_uniq_count_arr } from '@utils/use_uniq_count_arr.util.js';
import { use_product_promise } from '@utils/use_product_promise.util.js';

//!to refactor this shit
const findedLink = [...document.querySelector('.main-row__links').childNodes]
  .filter((__, idx) => !(idx & 1))
  .find((el) =>
    el.classList[1] === window.location.pathname.startsWith('/dist')
      ? window.location.pathname.split('/')[2].split('.')[0] === 'index'
        ? '/'
        : window.location.pathname.split('/')[2].split('.')[0]
      : window.location.pathname
  );
findedLink && findedLink.classList.add('main-row__links__link-wrapper--active');

const favouriteNode = document.querySelector('.button-favourite');
const basketNode = document.querySelector('.button-basket');
const headerMenuButtonNode = document.querySelector('.menu-button');
const headerNode = document.querySelector('header');
const basketDialogNode = document.querySelector('.basket');
const basketDialogCloseButtonNode = document.querySelector('.basket-content-header__close-button');

const BASKET_DIALOG_MAIN_CLASS = 'basket-content-main';
const basketDialogMainNode = document.querySelector('.' + BASKET_DIALOG_MAIN_CLASS);

let isHeaderMenuOpen = false;
headerMenuButtonNode.addEventListener('click', () => {
  isHeaderMenuOpen = !isHeaderMenuOpen;
  isHeaderMenuOpen ? (headerNode.classList = 'open header') : (headerNode.classList = 'closed header');
  headerMenuButtonNode.innerHTML = !isHeaderMenuOpen
    ? `<svg viewBox="0 0 24 24" ><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path></svg>`
    : `<svg viewBox="0 0 24 24" ><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'></path></svg>`;
});

favouriteNode.classList.add('with-label');
favouriteNode.setAttribute('data-label', '42');

const [basketValue, basketLength] = get_basket();

let isBasketDialogOpen = false;

basketNode.addEventListener('click', () => {
  isBasketDialogOpen = !isBasketDialogOpen;
  const basketClassList = basketDialogNode.classList;

  basketClassList.remove('basket--closed');
  if (!basketLength) return (basketDialogMainNode.innerHTML = `<p>No products was added yet.</p>`);

  const uniqCountArr = use_uniq_count_arr(basketValue);
  const promiseAll = use_product_promise(uniqCountArr.map(({ id }) => id));

  promiseAll.then((res) => {
    basketDialogMainNode.innerHTML = res
      .map(
        ({ title, image, price }) => `
          <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item'>
            <img src='${image}' class='${BASKET_DIALOG_MAIN_CLASS}__product-item__preview-img'> </img>
            <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content'>
              <p class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content__title'>${title} <p/>
              <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content__utils'>
                ${price}
              </div>
            </div>
          </div>
        `
      )
      .join('');
  });
});

basketDialogCloseButtonNode.addEventListener('click', () => {
  isBasketDialogOpen = !isBasketDialogOpen;
  const basketClassList = basketDialogNode.classList;
  basketClassList.add('basket--closed');
  basketDialogMainNode.innerHTML = ``;
});

!!basketLength && basketNode.classList.add('with-label');
basketNode.setAttribute('data-label', basketLength);
