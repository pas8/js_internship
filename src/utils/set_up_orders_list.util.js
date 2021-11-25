import { get_order_statuses_arr } from '@utils/get_order_statuses_arr.util.js';
import closeSvg from '@svgs/close.svg';

import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';


export const set_up_orders_list = () => {
  const buttonOpenOrdersListMode = document.querySelector('.utils__open-orders-list');
  const list_of_open_orders_node = document.querySelector('.list_of_open_orders');

  buttonOpenOrdersListMode.addEventListener('click', async () => {
    const [json, error] = await use_xml_http_request('orders');
    if (!!error) return use_toast(error, 'error');
    list_of_open_orders_node.style.display = 'grid';

    const statusesArr = get_order_statuses_arr();

    const validatedOrdersIdWithSatusessObj = JSON.parse(json).reduce((acc, { status, id }) => {
      return { ...acc, [status]: [...(acc[status] || []), id] };
    }, {});

    list_of_open_orders_node.innerHTML = `
      <div class='list_of_open_orders-content'>
        <div class='list_of_open_orders-content__title'>
          <p>${status} Orders list </p> <button class='close-button'>${closeSvg} </button>
        </div>
      <div class='list_of_open_orders-content__list'>
        ${statusesArr.map_join(
          (status) =>
            ` <div class='column' id='column_${status}'>
                <div  class='column_status' > ${status} </div>
                <div>
                  ${
                    validatedOrdersIdWithSatusessObj?.[status]?.map_join(
                      (id) =>
                        `<a class='column_item'  draggable="true" id='item_${id}' href='order_details.html?${id}'>${id}</a>`
                    ) || ''
                  } 
                </div>
                </div>
                `
        )} 
      </div>
      </div> 
    `;

    const columnItemsNodeArr = document.querySelectorAll('.column_item');
    const columnsNodeArr = document.querySelectorAll('.column');

    columnsNodeArr.forEach((el) => {
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      el.addEventListener('drop', async (e) => {
        const id = e.dataTransfer.getData('text');

        const ID = id.split('_')[1];

        const status = el.id.split('_')[1];
        const [res, error] = await use_xml_http_request(`orders?id=${ID}`, 'POST', JSON.stringify({ status }));

        if (!!error) {
          return use_toast(error, 'error');
        }

        const draggable_element = document.getElementById(id);

        draggable_element.style.background = 'rgb(229, 243, 255)';
        el.children[1].insertAdjacentElement('afterbegin', draggable_element);

        use_toast(res, 'info');
        e.dataTransfer.clearData();
      });
    });

    columnItemsNodeArr.forEach((el) => {
      const on_drag_start = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.currentTarget.style.backgroundColor = 'yellow';
      };

      el.addEventListener('dragstart', on_drag_start);
    });

    list_of_open_orders_node.querySelector('.close-button').addEventListener('click', () => {
      list_of_open_orders_node.style.display = 'none';
    });
  });
};
