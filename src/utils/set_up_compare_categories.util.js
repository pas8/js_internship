import { get_compare_table_html } from '@utils/get_compare_table_html.util.js';

export const set_up_compare_categories = (arr, compareDialogTableNode, categoriesHtml) => {
  [...compareDialogTableNode.children[0].children].forEach((el) => {
    el.addEventListener('click', () => {
      compareDialogTableNode.innerHTML = get_compare_table_html(arr, el.getAttribute('category-id'), el.textContent);
      compareDialogTableNode.querySelectorAll('.arrowBackSvg').forEach((el) =>
        el?.addEventListener('click', () => {
          compareDialogTableNode.innerHTML = categoriesHtml;
          set_up_compare_categories(arr, compareDialogTableNode, categoriesHtml);
        })
      );
    });
  });
};
