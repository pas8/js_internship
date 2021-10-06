import Glide from '@glidejs/glide';
import { API_URL } from './config/index';

import './styles/index.scss';
import './header&footer';
new Glide('.glide').mount();

import '@components/tab-panel.web.js';
import '@components/time-left.web.js';
import '@components/masonry-layout.web.js';
import '@components/special-product.web.js';

import { get_random_int } from '@utils/get_random_int.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { set_up_feature_products_tabs } from '@utils/set_up_feature_products_tabs.util.js';
import { use_validation_of_siderbar_utils } from '@utils/use_validation_of_siderbar_utils.util.js';


const categoriesContainer = document.querySelector('.categories-row');

const specialContentProductsNode = document.querySelector('.specical-products__content-products');
fetch(`${API_URL}/products`)
  .then((res) => res?.json())
  .then(({ data }) => {
    const categoriesArr = data.filter((__, idx) => idx < 6);

    set_up_feature_products_tabs(
      use_validation_of_siderbar_utils(categoriesArr)[0].map((el) => ({
        ...el,
        productsArr: categoriesArr.filter(({ categories }) => categories.some((__) => __?.id === el.id)),
      }))
    );

    specialContentProductsNode.innerHTML = categoriesArr.map_join(
      ({ image, price, name, id }) => `
        <special-product img_href='${image}' sale_percent='${get_random_int(
        92,
        96
      )}' is_new='true' stars='${get_random_int(4, 5)}' caption='${name}' current_price='${
        get_correct_currency() + price
      }' id='${id}' ></special-product>
    `
    );

    categoriesContainer.innerHTML = `
      ${categoriesArr.map_join(
        ({ image, name, id }) =>
          `<a class="categories-row__item" href='pages/product_details.html?${id}'> <img src='${image}'><p>${name
            .split(' ')
            .filter((__, idx) => idx < 1)
            .join(' ')}</p></a>`
      )}
    `;
  });
