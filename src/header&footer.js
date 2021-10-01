import '@components/social-utils.web.js';
import '@styles/_header.scss';
import '@styles/_compare_dialog.scss';
import '@styles/_searching_dialog.scss';
import '@styles/_basket_details.scss';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_up_basket_dialog } from '@utils/set_up_basket_dialog.util.js';
import { use_to_close_seacrhing_dialog } from '@utils/use_to_close_seacrhing_dialog.util.js';
import { use_to_open_seacrhing_dialog } from '@utils/use_to_open_seacrhing_dialog.util.js';
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();
window.isSeacrhingDialogOpen = false;

const buttonSearchNode = document.querySelector('.button-search');

set_up_basket_dialog();

const closeButtonOfSearchingDialogNode = document.querySelector('.searching-content__title-close-button');

const handleCloseDialog = use_to_close_seacrhing_dialog();
const handleOpenDialog = use_to_open_seacrhing_dialog();

buttonSearchNode.addEventListener('click', () => {
  if (window.isSeacrhingDialogOpen) return handleCloseDialog();
  handleOpenDialog();
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

// const favouriteNode = document.querySelector('.button-favourite');
// favouriteNode.classList.add('with-label');
// favouriteNode.setAttribute('data-label', '42');
