import '@styles/_user_profile.scss';
import 'regenerator-runtime/runtime.js';
import './header&footer';
import './header&footer';
import '@styles/_breadcrumb.scss';
import '@styles/__user_order.scss';
import { set_up_log_in_dialog } from '@utils/set_up_log_in_dialog.util.js';
import { use_check_for_empty_product_ids_arr } from '@utils/use_check_for_empty_product_ids_arr.util.js';
import { get_user } from '@utils/get_user.util.js';
import { get_sum_from_arr } from '@utils/get_sum_from_arr.util.js';
import { get_user_order_html } from '@utils/get_user_order_html.util.js';

(async () => {
  const [json, error] = await get_user();
console.log(error)
  if (!!error) {
    set_up_log_in_dialog();
  } else {
    const user = JSON.parse(json);

    const orders_arr = await Promise.all(
      user?.orders?.map(async ({ products, ...props }) => {
        const _products = await use_check_for_empty_product_ids_arr(products, () => []);

        if (!!_products[1]) return { ...products, _products: [] };
        _products[1] = get_sum_from_arr(
          _products?.[2].map(({ id, count }) => +_products[0].find((__) => __?.id === id)?.price * count)
        );
        return { ...props, _products };
      })
    );

    document.querySelector('main').innerHTML = `<div content>
    <div item> <p item_key>Name:</p> <p item_value> ${user?.name}</p> </div>
    <div item> <p item_key>Email:</p> <p item_value> ${user?.email}</p> </div>
    <p item_key >Orders:</p> <div order_list> ${orders_arr.map_join((el) => get_user_order_html(el))}</div>
    </div>`;
  }
})();
