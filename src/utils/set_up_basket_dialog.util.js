import { use_uniq_count_arr } from '@utils/use_uniq_count_arr.util.js';
import { use_product_promise } from '@utils/use_product_promise.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import '@prototypes/map_join.array.js';

export const set_up_basket_dialog = () => {
  let isBasketDialogOpen = false;

  const BASKET_DIALOG_MAIN_CLASS = 'basket-content-main';
  const basketNode = document.querySelector('.button-basket');

  const basketDialogCloseButtonNode = document.querySelector('.basket-content-header__close-button');
  const basketDialogNode = document.querySelector('.basket');
  const basketDialogMainNode = document.querySelector('.' + BASKET_DIALOG_MAIN_CLASS);

  basketNode.addEventListener('click', () => {
    const [basketValue, basketLength] = get_basket();

    isBasketDialogOpen = !isBasketDialogOpen;
    const basketClassList = basketDialogNode.classList;

    basketClassList.remove('basket--closed');
    if (!basketLength) return (basketDialogMainNode.innerHTML = `<p>No products was added yet.</p>`);
    const uniqCountArr = use_uniq_count_arr(basketValue);
    const promiseAll = use_product_promise(uniqCountArr.map(({ id }) => id));

    promiseAll.then((res) => {

      basketDialogMainNode.innerHTML = res.map_join(
        ({ title, image, price },idx) => `
            <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item'>
              <img src='${image}' class='${BASKET_DIALOG_MAIN_CLASS}__product-item__preview-img'> </img>
              <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content'>
                <p class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content__title'>${title} <p/>
                <div class='${BASKET_DIALOG_MAIN_CLASS}__product-item-content__utils'>
                  ${price} ${uniqCountArr[idx].count}
                </div>
              </div>
            </div>
          `
      );
    });
  });

  basketDialogCloseButtonNode.addEventListener('click', () => {
    isBasketDialogOpen = !isBasketDialogOpen;
    const basketClassList = basketDialogNode.classList;
    basketClassList.add('basket--closed');
    basketDialogMainNode.innerHTML = ``;
  });

  const [, basketLength] = get_basket();

  !!basketLength && basketNode.classList.add('with-label');
  basketNode.setAttribute('data-label', basketLength);
};
