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
    catalog_dialog_content_main_node.innerHTML = `<div class='catalog_dialog_content__main__parent'>${parent_categories.map_join(
      ({ d, name, id }) =>
        `<button parent_category_id='${id}' class='catalog_dialog_content__main__parent_button' ><svg viewBox='0 0 24 24'><path d='${d}'></path> </svg> ${name}</button>`
    )}</div> <div class='catalog_dialog_content__main__children'></div>`;

    catalog_dialog_content_main_node.style.border = '1px solid rgb(16,16,16)'

    const catalog_dialog_content_main_children_node = document.querySelector('.catalog_dialog_content__main__children');
    catalog_dialog_content_main_children_node.style.padding = '0px';

    const arr_of_catalog_dialog_content__main__parent_button_node = catalog_dialog_content_main_node.querySelectorAll(
      '.catalog_dialog_content__main__parent_button'
    );

    arr_of_catalog_dialog_content__main__parent_button_node.forEach((el) => {
      set_up_button_ripple(el, async () => {
        const id = el.getAttribute('parent_category_id');

        const [json, err] = await use_xml_http_request(`parent_category?id=${id}`);
        catalog_dialog_content_main_children_node.style.padding = '1rem';

        if (err) {
          return console.log(err);
        }

        const children_categories = JSON.parse(json);

        catalog_dialog_content_main_children_node.innerHTML = `${children_categories.map_join(
          ({ name, id }) =>
            `<button children_category_id='${id}' class='catalog_dialog_content__main__children_button' >${name}</button>`
        )}`;

        [...catalog_dialog_content_main_children_node.children].forEach((el) => {
          el.addEventListener('click', () => {
            const children_category_id = el.getAttribute('children_category_id');
            window.location.replace(`/pages/shop.html?category=${children_category_id}`);
          });
        });
      });
    });
  });

  catalog_dialog_content__close_button_node.addEventListener('click', () => {
    catalog_dialog_node.style.display = 'none';
  });
};
