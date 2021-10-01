import '@components/social-utils.web.js';
import '@styles/_header.scss';
import '@styles/_footer.scss';
import '@styles/_compare_dialog.scss';
import '@styles/_searching_dialog.scss';
import '@styles/_basket_details.scss';
import { set_up_search_dialog } from '@utils/set_up_search_dialog.util.js';
import { set_up_compare_dialog } from '@utils/set_up_compare_dialog.util.js';
import { set_up_basket_dialog } from '@utils/set_up_basket_dialog.util.js';
import { set_up_active_header_link } from '@utils/set_up_active_header_link.util.js';
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();

set_up_basket_dialog();
set_up_search_dialog()
set_up_compare_dialog()
set_up_active_header_link()

// const favouriteNode = document.querySelector('.button-favourite');
// favouriteNode.classList.add('with-label');
// favouriteNode.setAttribute('data-label', '42');
