import { use_validate_view_of_product } from '@utils/use_validate_view_of_product.util.js';

export const use_validation_of_products = (allProductsArr, idxToStop, idxToStart) => {
  let categoriesArr = [];
  let colorsArr = ['red', 'green', 'yellow', 'blue'];
  let pricesArr = [];
  let sizeArr = [1, 2, 3, 4];
  const html = allProductsArr
    .filter((__, idx) => idx > idxToStart && idx < idxToStop)
    .map((el) => {
      !categoriesArr.includes(el.category) && categoriesArr.push(el.category);
      pricesArr.push(el.price);
      return use_validate_view_of_product(el);
    })
    .join('');

  return [html, categoriesArr, colorsArr, sizeArr, Math.max(...pricesArr), ~~Math.min(...pricesArr)];
};
