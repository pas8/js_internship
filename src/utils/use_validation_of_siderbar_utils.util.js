
export const use_validation_of_siderbar_utils = (allProductsArr) => {
  let categoriesArr = [];
  let colorsArr = ['red', 'green', 'yellow', 'blue'];
  let pricesArr = [];
  let sizeArr = [1, 2, 3, 4];

  allProductsArr.forEach((el) => {
    !categoriesArr.includes(el.category) && categoriesArr.push(el.category);
    pricesArr.push(el.price);
  });

  return [categoriesArr, colorsArr, sizeArr, Math.max(...pricesArr), ~~Math.min(...pricesArr)];
};
