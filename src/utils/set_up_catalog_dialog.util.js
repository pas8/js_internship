import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { set_up_button_ripple } from '@utils/set_up_button_ripple.util.js';

export const set_up_catalog_dialog = () => {
  const catalog_dialog_node = document.querySelector('.catalog_dialog');
  const catalog_dialog_content_main_node = document.querySelector('.catalog_dialog_content__main');

  const button_node = document.querySelector('.main-row__utils__catalog-button');

  const catalog_dialog_content__close_button_node = document.querySelector('.catalog_dialog_content__close_button');

  set_up_button_ripple(button_node, async () => {
    catalog_dialog_node.style.display = 'grid';

    const [json, err] = await use_xml_http_request('parent_categories');

    if (!!err) {
      return console.log(err);
    }
    const parent_categories = JSON.parse(json);
    catalog_dialog_content_main_node.innerHTML = parent_categories.map_join(
      ({ d, name, id }) =>
        `<button parent_category_id='${id}' class='catalog_dialog_content__main__parent_button' ><svg viewBox='0 0 24 24'><path d='${d}'></path> </svg> ${name}</button>`
    );

    const arr_of_catalog_dialog_content__main__parent_button_node = catalog_dialog_content_main_node.querySelectorAll(
      '.catalog_dialog_content__main__parent_button'
    );

    arr_of_catalog_dialog_content__main__parent_button_node.forEach((el) => {
      set_up_button_ripple(el, () => {
        console.log(';');
      });
    });
  });

  catalog_dialog_content__close_button_node.addEventListener('click', () => {
    catalog_dialog_node.style.display = 'none';
  });
};
