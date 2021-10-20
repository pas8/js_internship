import { use_to_genegate_search_item_html } from '@utils/use_to_genegate_search_item_html.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { set_up_search_items } from '@utils/set_up_search_items.util.js';

export const set_up_admin_search = () => {
  const input_node = document.querySelector('.utils__search-input');

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
