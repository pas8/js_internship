import deleteSvg from '@svgs/delete.svg';
import editSvg from '@svgs/edit.svg';
import copy_svg from '@svgs/copy.svg';

export const use_to_genegate_search_item_html = ({ name, id, image, caption }) => {
  const _id = caption + '||||' + id;

  const utils = caption.startsWith('C')
    ? ''
    : `
    <button class='item__copy-button'  _id='${_id}'>${copy_svg}</button>         
    <button class='item__delete-button'  id='${_id}'>${deleteSvg}</button>`;

  return `
      <div class='item' id='${id}'>
        ${image ? `<img src=${image} ></img>` : ''}
        <p> ${name} </p> 
        <button class='item__edit-button' id='${_id}'>
          ${editSvg}
        </button>
        ${utils}
      </div>`;
};
