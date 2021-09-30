export const use_validation_of_products = (allProductsArr, idxToStop,idxToStart) => {
  let categoriesArr = [];
  let colorsArr = ['red', 'green', 'yellow', 'blue'];
  let pricesArr = [];
  let sizeArr = [1, 2, 3, 4];
  const html = allProductsArr
    .filter((__, idx) =>idx > idxToStart &&  idx < idxToStop)
    .map(({ image, title, id, category, price }) => {
      !categoriesArr.includes(category) && categoriesArr.push(category);
      pricesArr.push(price);
      return `<special-product img_href='${image}' id='${id}' caption='${title}' price='${price}'></special-product>`;
    })
    .join('');

  return [html, categoriesArr, colorsArr, sizeArr, Math.max(...pricesArr), ~~Math.min(...pricesArr)];
};
