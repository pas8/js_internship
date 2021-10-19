export const set_up_product_view_buttons = () => {
  const productsViewButttonNodesArr = [
    document.querySelector('.shop__products-utils__content-grid-view-button'),
    document.querySelector('.shop__products-utils__content-list-view-button'),
  ];

  productsViewButttonNodesArr.forEach((__, idx) => {
    const viewVariant = window.localStorage.getItem('productsViewVariant');
    viewVariant === 'grid' && idx === 0 && __.classList.add('button--active');
    viewVariant === 'list' && idx === 1 && __.classList.add('button--active');
    __.addEventListener('click', () => {
      const productsContainerNode = document.querySelector('.shop__products-row');

      productsContainerNode.innerHTML = productsContainerNode.outerHTML.replaceAll(
        productsContainerNode.outerHTML.includes('special-product') ? 'special-product' : 'horizontal-product',
        !productsContainerNode.outerHTML.includes('special-product') ? 'special-product' : 'horizontal-product'
      );

      productsViewButttonNodesArr.forEach((el) => el.classList.remove('button--active'));

      window.localStorage.setItem('productsViewVariant', idx === 0 ? 'grid' : 'list');
      __.classList.add('button--active');
    });
  });
};
