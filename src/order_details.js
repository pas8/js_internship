import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/order_details.scss';
import { use_check_for_auth } from '@utils/use_check_for_auth.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import { get_order_statuses_arr } from '@utils/get_order_statuses_arr.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

use_check_for_auth();
(async () => {
  const ID = window.location.search.slice(1);
  const main_node = document.querySelector('main');

  const [json, error] = await use_xml_http_request(`orders?id=${ID}`);
  if (!!error) return use_toast(error, 'error');

  const { id, status, ...props } = JSON.parse(json);

  main_node.innerHTML = `<div class='id'>id:${id}</div>
      ${Object.entries(props).map_join(
        ([caption, value]) => `
        <div class='row_of_props'>
          <p class='row_of_props-caption'>${caption}</p>
          <div class='row_of_props-container'>
            ${
              caption === 'products'
                ? value
                : Object.entries(value).map_join(
                    ([key, val]) =>
                      `<div class='item'><p class='item-key'>${key}:</p><p class='item-value'>${val}</p>  </div>`
                  )
            }
          </div>
        </div>
      `
      )}
      <div class='current_status'>Status:${status}</div>
      <select id='${id + 'status'}'>
        <option value='change_status'>Change status</option>
        ${get_order_statuses_arr().map_join((name) => ` <option value='${name}'>${name}</option>`)}     
      </select>
      `;
})();
