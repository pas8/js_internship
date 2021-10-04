import './header&footer';
import '@styles/_breadcrumb.scss';
import '@components/quantity-counter.web.js';
import '@styles/wishlist.scss';
import { use_product_promise } from '@utils/use_product_promise.util.js';
import { use_uniq_count_arr } from '@utils/use_uniq_count_arr.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { get_basket } from '@utils/get_basket.util.js';
import { get_wishlist_ids } from '@utils/get_wishlist_ids.util.js';
import { set_product_to_basket } from '@utils/set_product_to_basket.util.js';
import basketSvg from '@svgs/basket.svg';

const dataArr = get_wishlist_ids().filter(el=> !!el);
const uniqProductsCountAndIdArr = use_uniq_count_arr(dataArr);

const promiseAll = use_product_promise(uniqProductsCountAndIdArr.map(({ id }) => id));
const wishlistTableContentNode = document.querySelector('.wishlist-table-content');
promiseAll
  .then((arr) => {
    wishlistTableContentNode.innerHTML = arr.map_join(
      ({ title, category, price, image, id, value = uniqProductsCountAndIdArr.find((__) => __.id == id)?.count }) => `
        <div class="wishlist-table-content__item">
          <div class="wishlist-table-content__item-preview">
            <div class="wishlist-table-content__item-preview__img">
              <a href='product_details.html?${id}'>
                <img src="${image}"></img>
              </a>
            </div>
            <div class="wishlist-table-content__item-preview__denotation"> 
              <div class="wishlist-table-content__item-preview__denotation-title">${title}</div>
              <div class="wishlist-table-content__item-preview__denotation-category">${category}</div>
            </div>
          </div>
          <div class="wishlist-table-content__item-propertyies">
            <div class="wishlist-table-content__item-propertyies__price">${price + get_correct_currency()}</div>
            <div class="wishlist-table-content__item-propertyies__quantity"><quantity-counter value='${value}'></quantity-counter></div>
            <div class="wishlist-table-content__item-propertyies__total">${price * value}${get_correct_currency()}</div>
          </div>
          <button class="wishlist-table-content__item-add-to-basket-button ${
            get_basket()[0].includes(`${id}`) ? 'wishlist-table-content__item-add-to-basket-button--active' : ''
          }" product-id='${id}'>
            ${basketSvg}
          </button>
        </div>          
      `
    );
    const allAddToBaketNodeArr = wishlistTableContentNode.querySelectorAll(
      '.wishlist-table-content__item-add-to-basket-button'
    );

    const allCounterValueNodeAll = document.querySelectorAll('.quantity-counter__value');
    allCounterValueNodeAll.forEach((el) => {
      el.addEventListener(
        'DOMNodeInserted',
        (__) => {
          const parentNode = el.parentNode.parentNode.parentNode;
          const price = Number.parseFloat(parentNode.children[0].textContent);
          const totalPrice = (+__.target.textContent * price).toFixed(2);
          parentNode.children[2].innerHTML = totalPrice + get_correct_currency();
        },
        false
      );
    });

    allAddToBaketNodeArr.forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('product-id');
        const [basket, basketLength] = get_basket();
        const quantityOfThisProduct = basket.filter((__) => __ == id)?.length;

        const isIncludes = basket.includes(id);
        if (isIncludes) {
          const basketNode = document.querySelector('.button-basket');
          basketNode.setAttribute('data-label', basketLength - quantityOfThisProduct);

          window.localStorage.setItem('basket', basket.filter((__) => __ != id).join(' '));
          return el.classList.remove('wishlist-table-content__item-add-to-basket-button--active');
        }
        Array.from({ length: el.parentNode.querySelector('.quantity-counter__value').textContent }, () => {
          set_product_to_basket(id);
        });
        el.classList.add('wishlist-table-content__item-add-to-basket-button--active');
      });
    });
  })
  .catch((err) => console.log(err));
