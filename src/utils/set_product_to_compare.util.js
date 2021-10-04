import { get_compare_ids } from '@utils/get_compare_ids.util.js';

export const set_product_to_compare = (id) => {
  const compareIds = get_compare_ids();

  const storage = window.localStorage;
  const isIncludes = compareIds?.includes(id);  

  storage.setItem(
    'compare',
    !!compareIds ? (isIncludes ? compareIds.filter((__) => __ != id).join(' ') : [...compareIds, id].join(' ')) : [id]
  );

  const compareButtonNode = document.querySelector('.button-compare');
  compareButtonNode.classList.add('with-label');

  compareButtonNode.setAttribute('data-label', (compareIds?.length || 0) + (isIncludes ? -1 : 1));

  return isIncludes;
};
