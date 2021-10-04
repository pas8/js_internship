import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';
import { set_product_to_compare } from '@utils/set_product_to_compare.util.js';
import { use_to_open_seacrhing_dialog } from '@utils/use_to_open_seacrhing_dialog.util.js';

export function set_up_utils_of_product(id, className) {
  return function () {
    const handleOpenSearchDialog = use_to_open_seacrhing_dialog();

    const addToCardButtonNode = this.querySelector(`.${className}-add-to-card`);
    addToCardButtonNode.addEventListener('click', () => {
      addToCardButtonNode.classList.add(`${className}-item--active`);
      set_product_to_basket(id);
    });
    const seacrhButtonNode = this.querySelector(`.${className}-search`);

    seacrhButtonNode.addEventListener('click', () => {
      handleOpenSearchDialog();
    });

    const compareButtonNode = this.querySelector(`.${className}-compare`);

    compareButtonNode.addEventListener('click', () => {
      const isIncludes = set_product_to_compare(id);

      compareButtonNode.classList[isIncludes ? 'remove' : 'add'](`${className}-item--active`);
    });
  };
}
