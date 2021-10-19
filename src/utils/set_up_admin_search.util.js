import deleteSvg from '@svgs/delete.svg';
import editSvg from '@svgs/edit.svg';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_up_search_items } from '@utils/set_up_search_items.util.js';

export const set_up_admin_search = () => {
  const input_node = document.querySelector('.utils__search-input');

  const use_to_genegate_search_item_html = ({ name, id, image, caption }) => {
    return `
      <div class='item' id='${id}'>
        ${image ? `<img src=${image} ></img>` : ''}
        <p> ${name} </p> 
        <button class='item__edit-button' id='${caption + '||||' + id}'>
          ${editSvg}
        </button>
        ${
          caption.startsWith('C')
            ? ''
            : `<button class='item__delete-button'  id='${caption + '||||' + id}'>
            ${deleteSvg}`
        }
        </button>
      </div>`;
  };

  set_up_search(
    [
      document.querySelector('.utils__search-result'),
      document.querySelector('.utils__search-svg-container'),
      input_node,
    ],
    (arr, caption) => arr.map_join((props) => use_to_genegate_search_item_html({ ...props, caption })),
    set_up_search_items
  );
};
