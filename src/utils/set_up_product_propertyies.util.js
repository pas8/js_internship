import { get_basket } from '@utils/get_basket.util.js';
import { get_compare_ids } from '@utils/get_compare_ids.util.js';
import { get_wishlist_ids } from '@utils/get_wishlist_ids.util.js';

export const set_up_product_propertyies = (productThis, id) => {
  const [basketValue] = get_basket();
  const wishlistIds = get_wishlist_ids();
  const compareIds = get_compare_ids();
  productThis.is_favourite = wishlistIds?.includes(id);
  productThis.is_added_to_compare = compareIds?.includes(id);
  productThis.is_added_to_basket = basketValue?.includes(id);

  return [basketValue, wishlistIds, compareIds];
};
