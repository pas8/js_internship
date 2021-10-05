import { use_validate_view_of_product } from '@utils/use_validate_view_of_product.util.js';

export const use_validation_of_products = (allProductsArr, idxToStop, idxToStart) => {
  const html = allProductsArr
    .filter((__, idx) => idx >= idxToStart && idx < idxToStop)
    .map((el) => use_validate_view_of_product(el))
    .join('');

  return html;
};
