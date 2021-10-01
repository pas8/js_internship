import { get_compare_ids } from '@utils/get_compare_ids.util.js';
import { to_capitalize } from '@utils/to_capitalize.util.js';
import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import { use_product_promise } from '@utils/use_product_promise.util.js';
import arrowBackSvg from '@svgs/arrow_back.svg';

export const use_to_open_compare_dialog = () => () => {
  const compareDialogNode = document.querySelector('.compare-dialog');
  const compareDialogTableNode = document.querySelector('.compare-content__table');

  window.isCompareDialogOpen = true;
  compareDialogNode.classList.remove('compare-dialog--closed');

  const promiseAll = use_product_promise(get_compare_ids());

  promiseAll
    .then((arr) => {
      let categoriesArr = [];
      arr.forEach(({ category }) => {
        !categoriesArr.includes(category) && !!category && categoriesArr.push(category);
      });

      const categoriesHtml = `
        <div class='compare-content__table-categories'> 
          ${categoriesArr.map_join(
            (title) => `<button  class='compare-content__table-categories__item'> ${to_capitalize(title)}</button>`
          )}
        <div> `;

      compareDialogTableNode.innerHTML = categoriesHtml;

      [...compareDialogTableNode.children[0].children].forEach((el) => {
        el.addEventListener('click', () => {
          compareDialogTableNode.innerHTML = `
            <div class='compare-content__table-content'> 
              <div class='compare-content__table-content-properties'> 
                <div class='compare-content__table-content-properties__placeholder'> 
                  <button class='arrowBackSvg'> ${arrowBackSvg}    </button>
                  <p> ${el.textContent} </p>
                </div> 

                ${['Stars &#9733;',`Price ${get_correct_currency()}`].map_join(
                  (__) => `
                    <div class='compare-content__table-content-properties__item'> 
                      ${__}
                    </div> 
                  `
                )}
              </div> 
              <div class='compare-content__table-content-row'> 
                ${arr
                  .filter(({ category }) => category != el.textContent.toLowerCase() && !!category)
                  .map_join(
                    ({ title, image, id, price, rating }) =>
                      `<div  class='compare-content__table-content-row__item' compare-id='${id}'>
                        <div  class='compare-content__table-content-row__item-preview'> 
                          <div  class='compare-content__table-content-row__item-preview__img'>
                            <img src='${image}'></img> 
                          </div>
                          <div  class='compare-content__table-content-row__item-preview__title'> 
                          ${title}
                          </div>
                        </div>
                        ${[rating.count, price].map_join(
                          (el) => `<div  class='compare-content__table-content-row__item-property'>
                                    ${el}
                                  </div>`
                        )}
                      </div>`
                  )}
                <div> 
              <div> 
            `;
          // console.log(compareDialogTableNode.querySelector('.arrowBackSvg'));
          compareDialogTableNode.querySelectorAll('.arrowBackSvg').forEach((el) =>
            el?.addEventListener('click', () => {
              alert('fuck you');
            })
          );
        });
      });
    })
    .catch((err) => console.log(err));
};
