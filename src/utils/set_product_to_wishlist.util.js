import { get_wishlist_ids } from '@utils/get_wishlist_ids.util.js';

export const set_product_to_wishlist = (id) => {
  const storage = window.localStorage;
  const isIncludes = wishlistIds?.includes(id);
  const wishlistIds = get_wishlist_ids();

  storage.setItem(
    'wishlist',
    !!wishlistIds
      ? isIncludes
        ? wishlistIds.filter((__) => __ != id).join(' ')
        : [...wishlistIds, id].join(' ')
      : [id]
  );

  const wishlistButtonNode = document.querySelector('.button-favourite');
  wishlistButtonNode.classList.add('with-label');
  wishlistButtonNode.setAttribute('data-label', (wishlistIds?.length || 0) + (isIncludes ? -1 : 1));

  
  return isIncludes;
};
