import { get_compare_ids } from '@utils/get_compare_ids.util.js';
import { set_up_compare_categories } from '@utils/set_up_compare_categories.util.js';
import { use_product_promise } from '@utils/use_product_promise.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const use_to_open_compare_dialog = () => async () => {
  const compareDialogNode = document.querySelector('.compare-dialog');
  const compareDialogTableNode = document.querySelector('.compare-content__table');

  window.isCompareDialogOpen = true;
  compareDialogNode.classList.remove('compare-dialog--closed');

  const compareProductsIdArr = get_compare_ids();

  if ((!compareProductsIdArr?.[0] && compareProductsIdArr?.length <= 1) || !compareProductsIdArr?.length)
    return (compareDialogTableNode.innerHTML =
      '<div class="compare-content__placeholder"> No products was added to compare </div>');

  const arr = await use_product_promise(compareProductsIdArr);

  let categoriesIdsArr = [];
  arr.forEach(({ categories }) => {
    categories.forEach((id) => {
      !categoriesIdsArr.some((__) => __ === id) && categoriesIdsArr.push(id);
    });
  });
  const categoriesArr = await Promise.all(categoriesIdsArr.map((id) => use_xml_http_request(`categories?id=${id}`)));

  const categoriesHtml = `
    <div class='compare-content__table-categories'> 
      ${categoriesArr.map_join(([json]) => {
        const { name, id } = JSON.parse(json);
        return `<button  category-id='${id}'  class='compare-content__table-categories__item'>${name}</button>`;
      })}
    <div> `;

  compareDialogTableNode.innerHTML = categoriesHtml;

  set_up_compare_categories(arr, compareDialogTableNode, categoriesHtml);
};
