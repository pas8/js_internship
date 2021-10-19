import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import closeSvg from '@svgs/close.svg';
import saveSvg from '@svgs/save.svg';










export const set_up_list_of_parent_categories = () => {
  const button_to_open_list_of_parent_category_node = document.querySelector(
    '.utils__open_list_of_parent_category_button'
  );
  const list_of_parent_categories_node = document.querySelector('.list_of_parent_categories');
  button_to_open_list_of_parent_category_node.addEventListener('click', async () => {
    list_of_parent_categories_node.style.display = 'grid';

    const [json, err] = await use_xml_http_request(`all_parent_categories`);

    if (!!err) {
      return use_toast(err, 'error');
    }
    const arr = JSON.parse(json);

    list_of_parent_categories_node.innerHTML = `
    <div class='list_of_parent_categories__content'>
      <div class='list_of_parent_categories__content-title'>
        <p> Parent categories </p> <button class='close-button'>${closeSvg}</button>
      </div>
        <div class='list_of_parent_categories__content-main'>
          ${arr.map_join((el) => {
            return `<div status='_edit' _id='${el.id}'><svg viewBox='0 0 24 24' _d='${el.d}'><path d='${el.d}'></path></svg> <div _prev_value='${el.d}'><input  name='name' value='${el.name}'></input> </div><button> ${saveSvg} </button> </div>`;
          })}
        </div>
      </div>
  `;

    list_of_parent_categories_node.querySelector('.close-button').addEventListener('click', () => {
      list_of_parent_categories_node.style.display = 'none';
    });
    const categories_container_node = list_of_parent_categories_node.querySelector(
      '.list_of_parent_categories__content-main'
    );

    const _edit_d =
      'M18 4h-2v7.9l2-2zM4 4h2v16H4zm6 0h2v4h-2zm0 6h2v4h-2zm0 6h2v4h-2zm12.56-3.41-1.15-1.15c-.59-.59-1.54-.59-2.12 0L14 16.73V20h3.27l5.29-5.29c.59-.59.59-1.54 0-2.12zm-5.98 5.86h-1.03v-1.03L19 13.97 20.03 15l-3.45 3.45z';
    [...categories_container_node.children].forEach((el) => {
      const svg_button = el.children[0];

      el.children[2].addEventListener('click', async () => {
        const _p = el.children[1].getAttribute('_prev_value');
        const _v = el.children[1].children[0].value;
        const is_reversed = el.getAttribute('status') !== '_';

        const d = !is_reversed ? _v : _p;

        const [res, err] = await use_xml_http_request(
          `categories?id=${el.getAttribute('_id')}`,
          'POST',
          JSON.stringify({ name: is_reversed ? _v : _p, d })
        );

        if (!!err) {
          return use_toast(err, 'error');
        }
        return use_toast(res, 'info');
      });

      svg_button.addEventListener('click', () => {
        const is_just_edit_status = el.getAttribute('status') === '_edit';
        const _d = svg_button.getAttribute('_d');
        const _prev_value = [...el.children[1].getAttribute('_prev_value')].join('');

        el.children[1].setAttribute('_prev_value', el.children[1].children[0].value);
        el.children[1].children[0].value = _prev_value;

        el.setAttribute('status', is_just_edit_status ? '_' : '_edit');
        svg_button.children[0].setAttribute('d', is_just_edit_status ? _edit_d : _d);
      });
    });
  });
};
