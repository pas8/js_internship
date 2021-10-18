import { use_product_promise } from '@utils/use_product_promise.util.js';
import { use_uniq_count_arr } from '@utils/use_uniq_count_arr.util.js';

export const use_check_for_empty_product_ids_arr = async (dataArr, funcIfProductIdsArrAreIsEmpty) => {
  const idsArr = dataArr?.filter((el) => !!el);

  if (!idsArr?.length) return funcIfProductIdsArrAreIsEmpty();

  const uniqProductsCountAndIdArr = use_uniq_count_arr(idsArr);

  const promiseAll = use_product_promise(uniqProductsCountAndIdArr.map(({ id }) => id));

  const arr = await promiseAll;

  try {


    return [arr, null, uniqProductsCountAndIdArr];
  } catch (error) {
    return [null, error, uniqProductsCountAndIdArr];
  }
};
