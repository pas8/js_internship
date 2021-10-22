import './header&footer';
import '@styles/shop.scss';
import '@styles/_breadcrumb.scss';
import '@components/double-range.web.js';
import '@components/special-product.web.js';
import '@components/horizontal-product.web.js';

import { set_shop_propertyies } from '@utils/set_shop_propertyies.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_up_product_view_buttons } from '@utils/set_up_product_view_buttons.util.js';

import { set_shop_sidebar_properties } from '@utils/set_shop_sidebar_properties.util.js';
import { set_shop_pagination_propertyies } from '@utils/set_shop_pagination_propertyies.util.js';

window.localStorage.setItem('productsViewVariant', 'grid');

(async () => {
  const search_str = window.location.search;
  const URL = search_str.startsWith('?category=') ? `products_of_${search_str}` : 'products';

  const [json, error] = await use_xml_http_request(URL);
  if (error) {
    return console.log(error);
  }

  const allProductsArr = JSON.parse(json);

  set_shop_propertyies(allProductsArr);
  set_shop_sidebar_properties(allProductsArr);
  set_shop_pagination_propertyies(allProductsArr);

  set_up_search([
    document.querySelector('.shop__sidebar-search__result'),
    document.querySelector('.shop__sidebar-search__svg-container'),
    document.querySelector('.shop__sidebar-search__input'),
  ]);

  set_up_product_view_buttons();
})();
