export const set_up_children_category_elemnts_of_catalog = (json, catalog_dialog_content_main_children_node) => {
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
};
