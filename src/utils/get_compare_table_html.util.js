import { get_correct_currency } from '@utils/get_correct_currency.util.js';
import arrowBackSvg from '@svgs/arrow_back.svg';

export const get_compare_table_html = (arr, categoryId, name) => {
  return `
    <div class='compare-content__table-content'> 
      <div class='compare-content__table-content-properties'> 
        <div class='compare-content__table-content-properties__placeholder'> 
          <button class='arrowBackSvg'> ${arrowBackSvg}    </button>
          <p> ${name} </p>
        </div> 

        ${['Stars &#9733;', `Price ${get_correct_currency()}`].map_join(
          (__) => `
            <div class='compare-content__table-content-properties__item'> 
              ${__}
            </div> 
          `
        )}
      </div> 
      <div class='compare-content__table-content-row'> 
        ${arr
          .filter(({ categories }) => categories.some(( id ) => id == categoryId))
          .map_join(
            ({ name, image, id, price, rating }) =>
              `<div  class='compare-content__table-content-row__item' compare-id='${id}'>
                <div  class='compare-content__table-content-row__item-preview'> 
                  <div  class='compare-content__table-content-row__item-preview__img'>
                    <img src='${image}'></img> 
                  </div>
                  <div  class='compare-content__table-content-row__item-preview__title'> 
                  ${name}
                  </div>
                </div>
                ${[rating, price].map_join(
                  (el) => `
                    <div  class='compare-content__table-content-row__item-property'>
                      ${el}
                    </div>`
                )}
              </div>`
          )}
        <div> 
      <div> 
    `;
};
