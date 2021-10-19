import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import { to_capitalize } from '@utils/to_capitalize.util.js';
import { convert_arr_values_to_obj } from '@utils/convert_arr_values_to_obj.util.js';
import { set_up_addition_propertyies_utils } from '@utils/set_up_addition_propertyies_utils.util.js';

import { use_validation_of_all_field } from '@utils/use_validation_of_all_field.util.js';
import { set_up_category_menu } from '@utils/set_up_category_menu.util.js';
import { use_to_generate_categories_content_html } from '@utils/use_to_generate_categories_content_html.util.js';

import deleteSvg from '@svgs/delete.svg';
import editSvg from '@svgs/edit.svg';

import closeSvg from '@svgs/close.svg';
import saveSvg from '@svgs/save.svg';

export const set_up_search_items = () => {
  const allDeleteButtonNodeArr = document.querySelectorAll('.item__delete-button');
  const allEditButtonNodeArr = document.querySelectorAll('.item__edit-button');

  [...allDeleteButtonNodeArr]?.forEach((el) => {
    el?.addEventListener('click', async () => {
      const [href, queryId] = el.id.split('||||');
      const [res, err] = await use_xml_http_request(`delete_${href.toLowerCase()}?id=${queryId}`);

      if (!!err) {
        return use_toast(err, 'error');
      }
      el.parentElement.remove();

      return use_toast(res, 'info');
    });
  });

  const handle_open_product_edit_dialog = async (str) => {
    const CLASS = 'editing_dialog';

    const editingDialogNode = document.querySelector('.' + CLASS);

    const [href, queryId] = str.split('||||');

    editingDialogNode.innerHTML = `
      <nb-skeleton height='480px' width='360px',count='1'>
      </nb-skeleton>
    `;

    const [res, err] = await use_xml_http_request(`${href.toLowerCase()}?id=${queryId}`);

    if (!!err) {
      return use_toast(err, 'error');
    }
    let { id, imgGallery, image, categories, addition_propertyies, rating, _id, ...props } = JSON.parse(res);
    _id;
    rating;

    editingDialogNode.style.display = 'grid';

    const use_to_generate_gallry_content_html = () =>
      imgGallery.map_join((src) => `<img class='editing_dialog__content-gallery__img-item' src='${src}'></img>`);

    editingDialogNode.innerHTML = `
      <div class='editing_dialog__content'>
        <div class='editing_dialog__content-title'>
          <img src='${image}' class='preview_img'></img>  <p>  ${id} </p> <button class='close-button'>${closeSvg}</button>
        </div>
        <div class='editing_dialog__content-gallery'>
        <label>Image gallery</label>
          <div class='editing_dialog__content-gallery__content'>${use_to_generate_gallry_content_html()}</div>
        </div>
        <div class='editing_dialog__content-utils'>
          <form>
          <label>${to_capitalize(Object.keys(props).join(', '))}</label>
            ${Object.entries(props).map_join(
              ([name, value]) => `
              <input class='input' placeholder='${to_capitalize(name)}' name='${name}' value='${value}' type='${
                name.toLowerCase() === 'color' ? 'color' : 'text'
              }'>

              </input>
            `
            )}
          <form>
          <div class='editing_dialog__content-utils__categories'>
            <label>
              Categories
            </label>
            <div class='editing_dialog__content-utils__categories__content'>
              ${await use_to_generate_categories_content_html(categories)}
            </div>
          </div>
          <div class="editing_dialog__content-addition_propertyies">
            <label>Addition propertyies</label>
            ${Object.entries(addition_propertyies).map_join(
              ([key, value]) => `
              <div class="editing_dialog__content-addition_propertyies__field">
                <input class="editing_dialog__content-addition_propertyies__field_key_input input" placeholder='Key'  value='${key}'></input>
                <input class="editing_dialog__content-addition_propertyies__field_value_input input" placeholder='Value'  value='${value}'></input>
                <button class="editing_dialog__content-addition_propertyies__remove_filed_button">
                  ${deleteSvg}
                </button>
              </div>
            `
            )}
          
            <button class="editing_dialog__content-addition_propertyies__new_field_button">+ New field</button>
          </div>
          
          <button class='button--contained editing_dialog__content-utils__save-button'>
            Save changes
          </button>
        </div>

      </div>
    `;

    const previewImgNode = document.querySelector('.preview_img');

    const editingDialogContentGalleryImgItemNodeArr = document.querySelectorAll(
      '.editing_dialog__content-gallery__img-item'
    );

    const galleryContentNode = document.querySelector('.editing_dialog__content-gallery__content');

    const set_up_img_gallry = (arr) => {
      arr.forEach((el) => {
        el.addEventListener('click', () => {
          const _src = el.getAttribute('src');
          imgGallery = [...imgGallery.filter((src) => src !== _src), image];
          image = _src;
          galleryContentNode.innerHTML = use_to_generate_gallry_content_html();
          previewImgNode.setAttribute('src', image);
          set_up_img_gallry(document.querySelectorAll('.editing_dialog__content-gallery__img-item'));
        });
      });
    };
    set_up_img_gallry(editingDialogContentGalleryImgItemNodeArr);
    set_up_addition_propertyies_utils('editing_dialog__content-addition_propertyies');

    const saveButtonNode = editingDialogNode.querySelector('.editing_dialog__content-utils__save-button');
    const closeButtonNode = editingDialogNode.querySelector('.close-button');

    const categoriesContentNode = document.querySelector('.editing_dialog__content-utils__categories__content');
    const categoryMenuNode = document.querySelector('.categories_menu');

    set_up_category_menu(['add-category-button', categories, categoryMenuNode, categoriesContentNode]);

    closeButtonNode.addEventListener('click', () => {
      editingDialogNode.style.display = 'none';
    });

    saveButtonNode.addEventListener('click', async (e) => {
      e.preventDefault();
      const addition_propertyies_node = editingDialogNode.querySelector(
        '.editing_dialog__content-addition_propertyies'
      );
      const addition_propertyies_inputs_node_arr = [...addition_propertyies_node.querySelectorAll('input')];

      if (addition_propertyies_inputs_node_arr.some((el) => !el.value)) {
        return use_toast('Some addition properties field is empty ', 'error');
      }

      const addition_propertyies = convert_arr_values_to_obj(addition_propertyies_inputs_node_arr);

      const data = {
        ...Object.fromEntries([...new FormData(editingDialogNode.querySelector('form'))]),
        categories: [...editingDialogNode.querySelectorAll('.category-button')]
          .map((el) => el.getAttribute('category-id'))
          .filter((el) => !!el),
        imgGallery,
        image,
        id,
      };
      const empty_field = use_validation_of_all_field(data);

      if (!!empty_field) {
        return use_toast(empty_field + ' is empty ', 'error');
      }

      const [res, err] = await use_xml_http_request(
        `products?id=${id}`,
        'POST',
        JSON.stringify({ ...data, addition_propertyies })
      );

      if (!!err) {
        return use_toast(err, 'error');
      }
      editingDialogNode.style.display = 'none';

      return use_toast(res, 'info');
    });
  };

  const set_up_changing_category = (str) => {
    const [caption, id] = str.split('||||');
    const node = document.getElementById(id);
    const category_name = [...node.children][0].textContent;

    node.innerHTML = `<input id='input_${id}' value='${category_name.trim()}'></input> <button id='save_button_${id}'>${saveSvg}</button> <button id='close_button_${id}'>${closeSvg}</button>`;

    const handle_return_search_html = (name) => {
      node.innerHTML = `
      <p> ${name} </p> 
        <button class='item__edit-button' id='${caption + '||||' + id}'>
          ${editSvg}
        </button>      
      `;
      set_up_search_items();
    };

    [...node.children].forEach((el) => {
      el.id.startsWith('save') &&
        el.addEventListener('click', async () => {
          const name = node.children[0].value;

          if (!name) {
            return use_toast('Name is empty', 'error');
          }

          const [res, err] = await use_xml_http_request(`categories?id=${id}`, 'POST', JSON.stringify({ name }));

          if (!!err) {
            return use_toast(err, 'error');
          }

          use_toast(res, 'info');
          return handle_return_search_html(name);
        });
      el.id.startsWith('close') && el.addEventListener('click', () => handle_return_search_html(category_name));
    });
  };

  allEditButtonNodeArr?.forEach((el) => {
    el?.addEventListener('click', () => {
      (el.id.startsWith('C') ? set_up_changing_category : handle_open_product_edit_dialog)(el?.id);
    });
  });
};
