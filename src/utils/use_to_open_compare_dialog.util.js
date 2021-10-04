import { get_compare_ids } from '@utils/get_compare_ids.util.js';
import { to_capitalize } from '@utils/to_capitalize.util.js';
import { set_up_compare_categories } from '@utils/set_up_compare_categories.util.js';
import { use_product_promise } from '@utils/use_product_promise.util.js';

export const use_to_open_compare_dialog = () => () => {
  const compareDialogNode = document.querySelector('.compare-dialog');
  const compareDialogTableNode = document.querySelector('.compare-content__table');

  window.isCompareDialogOpen = true;
  compareDialogNode.classList.remove('compare-dialog--closed');

  const compareProductsIdArr = get_compare_ids()
  if(!compareProductsIdArr[0]) return compareDialogTableNode.innerHTML = '<div class="compare-content__placeholder"> No products was added to compare </div>'

  const promiseAll = use_product_promise(compareProductsIdArr);

  promiseAll
    .then((arr) => {
      let categoriesArr = [];
      arr.forEach(({ category }) => {
        !categoriesArr.includes(category) && !!category && categoriesArr.push(category);
      });

      const categoriesHtml = `
        <div class='compare-content__table-categories'> 
          ${categoriesArr.map_join(
            (title) => `<button  class='compare-content__table-categories__item'>${to_capitalize(title)}</button>`
          )}
        <div> `;

      compareDialogTableNode.innerHTML = categoriesHtml;

      set_up_compare_categories(arr,compareDialogTableNode,categoriesHtml)
    })
    .catch((err) => console.log(err));
};
