import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const set_up_catalog_dialog = () => {
  const catalog_dialog_node = document.querySelector('.catalog_dialog');
  const catalog_dialog_content_main_node = document.querySelector('.catalog_dialog_content__main');

  const button_node = document.querySelector('.main-row__utils__catalog-button');
  const ripple_node = button_node.querySelector('.ripple');

  button_node.addEventListener('click', async ({ clientX, currentTarget, clientY }) => {
    const x = clientX - currentTarget.getBoundingClientRect().left;
    const y = clientY - currentTarget.getBoundingClientRect().top;

    ripple_node.style.display = 'flex';
    ripple_node.style.left = x + 'px';
    ripple_node.style.top = y + 'px';
    catalog_dialog_node.style.display = 'grid';

    setTimeout(() => {
      ripple_node.style.display = 'none';
    }, 800);

    const [json, err] = await use_xml_http_request('parent_categories');

    if (!!err) {
      return console.log(err);
    }
    const parent_categories = JSON.parse(json);

    catalog_dialog_content_main_node.innerHTML = parent_categories.map_join(
      ({ d, name, id }) =>
        `<button parent_category_id='${id}' ><svg viewBox='0 0 24 24'><path d='${d}'></path> </svg>  ${name}</button>`
    );
  });
};
