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

  const { id, by, _id, status, ...props } = JSON.parse(json);
  _id;
  by;
  
  main_node.insertAdjacentHTML(
    'beforeend',
    `<div class='id'>id:${id}</div>
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
      <div class='row_of_props-status'>
      <div class='row_of_props-status_current'>Status: ${status}</div>
      <select >
        <option value='change_status'>Change status</option>
        ${get_order_statuses_arr().map_join((name) => ` <option value='${name}'>${name}</option>`)}     
      </select>
      </div>
      <button class='delete_button button--contained'>Delete</button>
      `
  );

  const status_select_node = document.querySelector('select');
  const status_current_node = document.querySelector('.row_of_props-status_current');
  const delete_button_node = document.querySelector('.delete_button');
  const to_home_button_node = document.querySelector('.to_home_button');

  delete_button_node.addEventListener('click', async () => {
    const [res, error] = await use_xml_http_request(`delete_order?id=${ID}`);

    if (!!error) {
      return use_toast(error, 'error');
    }

    use_toast(res, 'info');
    return window.location.replace('/pages/admin.html');
  });

  status_select_node.addEventListener('change', async (e) => {
    e.preventDefault();

    let status = e.target.value;
    const [res, error] = await use_xml_http_request(`orders?id=${ID}`, 'POST', JSON.stringify({ status }));

    if (!!error) {
      e.target.value = 'change_status';

      return use_toast(error, 'error');
    }
    status_current_node.innerHTML = `Status: ${status}`;

    e.target.value = 'change_status';

    return use_toast(res, 'info');
  });

  to_home_button_node.addEventListener('click', () => {
    window.location.replace('/pages/admin.html');
  });
})();
