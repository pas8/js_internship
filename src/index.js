import Glide from '@glidejs/glide';

import './styles/index.scss';
import './header&footer';
new Glide('.glide').mount();

import '@components/tab-panel.web.js';
import '@components/time-left.web.js';
import '@components/masonry-layout.web.js';
import '@components/special-product.web.js';

import { get_random_int } from '@utils/get_random_int.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { set_up_feature_products_tabs } from '@utils/set_up_feature_products_tabs.util.js';
import { use_validation_of_siderbar_utils } from '@utils/use_validation_of_siderbar_utils.util.js';
import { set_up_button_ripple } from '@utils/set_up_button_ripple.util.js';
import { set_up_children_category_elemnts_of_catalog } from '@utils/set_up_children_category_elemnts_of_catalog.util.js';

(async () => {
  const categoriesContainer = document.querySelector('.categories-row');

  const specialContentProductsNode = document.querySelector('.specical-products__content-products');

  const [res, error] = await use_xml_http_request('products');
  const [categories_json, err] = await use_xml_http_request('all_parent_categories');

  if (!!error || !!err) return console.error(error, err);

  const data = JSON.parse(res);
  const productsArr = data.filter((__, idx) => idx < 6);

  const [categoriesArr] = await use_validation_of_siderbar_utils(productsArr);

  set_up_feature_products_tabs(
    categoriesArr.map((el) => ({
      ...el,
      productsArr: productsArr.filter(({ categories }) => categories.some((__) => __ === el.id)),
    }))
  );

  specialContentProductsNode.innerHTML = productsArr.map_join(
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
    ${JSON.parse(categories_json).map_join(
      ({ d, name, id }) =>
        `<button class="categories-row__item" _id='${id}'> <svg viewBox='0 0 24 24'><path d="${d}"/></svg><p>${name}</p></button>`
    )}
  `;

  [...categoriesContainer.children].forEach((el) => {
    set_up_button_ripple(el, async () => {
      const catalog_dialog_node = document.querySelector('.catalog_dialog');

      catalog_dialog_node.style.display = 'grid';
      const id = el.getAttribute('_id');

      const [json, err] = await use_xml_http_request(`parent_category?id=${id}`);

      if (err) {
        return console.log(err);
      }
      const main_node = document.querySelector('.catalog_dialog_content__main');
      main_node.style.flexDirection = 'column';
      set_up_children_category_elemnts_of_catalog(json, main_node);
    });
  });
})();
