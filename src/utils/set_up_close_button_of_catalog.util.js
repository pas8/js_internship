export const set_up_close_button_of_catalog = () => {
  const catalog_dialog_node = document.querySelector('.catalog_dialog');

  const catalog_dialog_content__close_button_node = document.querySelector('.catalog_dialog_content__close_button');

  catalog_dialog_content__close_button_node.addEventListener('click', () => {
    catalog_dialog_node.style.display = 'none';
  });
  return [catalog_dialog_node, catalog_dialog_content__close_button_node];
};
