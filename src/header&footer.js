import '@components/social-utils.web.js';
import '@styles/_header.scss';
import '@styles/_footer.scss';
import '@styles/_basket_details.scss';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_up_basket_dialog } from '@utils/set_up_basket_dialog.util.js';
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();

window.isSeacrhingDialogOpen = false;
  const buttonSearchNode = document.querySelector('.button-search');


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
const headerMenuButtonNode = document.querySelector('.menu-button');
const headerNode = document.querySelector('header');

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

set_up_basket_dialog();

const searchingDialogNode = document.querySelector('.searching-dialog');
const closeButtonOfSearchingDialogNode = document.querySelector('.searching-content__title-close-button');
const handleCloseDialog = () => {
  window.isSeacrhingDialogOpen = false;
  searchingDialogNode.classList.add('searching-dialog--closed');
};

buttonSearchNode.addEventListener('click', () => {
  if (window.isSeacrhingDialogOpen) return handleCloseDialog();
  window.isSeacrhingDialogOpen = true;
  searchingDialogNode.classList.remove('searching-dialog--closed');
});

closeButtonOfSearchingDialogNode.addEventListener('click', handleCloseDialog);

set_up_search(
  [],
  [
    document.querySelector('.searching-content-search__result'),
    document.querySelector('.searching-content-search__svg-container'),
    document.querySelector('.searching-content-search__input'),
  ]
);
