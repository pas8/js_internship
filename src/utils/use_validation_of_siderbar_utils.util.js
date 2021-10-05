export const use_validation_of_siderbar_utils = (allProductsArr) => {
  let categoriesArr = [];
  let colorsArr = ['red', 'green', 'yellow', 'blue'];
  let pricesArr = [];
  let sizeArr = [1, 2, 3, 4];

  allProductsArr.forEach((el) => {
    el.categories.forEach(({ id, name }) => {
      !categoriesArr.some((__) => __?.id === id) && categoriesArr.push({ id, name });
    });

    pricesArr.push(el.price);
  });

  return [categoriesArr, colorsArr, sizeArr, Math.max(...pricesArr), ~~Math.min(...pricesArr)];
};
