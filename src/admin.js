import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/admin.scss';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { use_check_for_auth } from '@utils/use_check_for_auth.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import { get_order_statuses_arr } from '@utils/get_order_statuses_arr.util.js';
import { to_capitalize } from '@utils/to_capitalize.util.js';
import { use_validation_of_all_field } from '@utils/use_validation_of_all_field.util.js';
import { set_up_category_menu } from '@utils/set_up_category_menu.util.js';
import { use_to_generate_categories_content_html } from '@utils/use_to_generate_categories_content_html.util.js';

import deleteSvg from '@svgs/delete.svg';
import closeSvg from '@svgs/close.svg';
import editSvg from '@svgs/edit.svg';
import saveSvg from '@svgs/save.svg';

import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();
use_check_for_auth();

(async () => {
  const buttonOpenOrdersListMode = document.querySelector('.utils__open-orders-list');
  const list_of_open_orders_node = document.querySelector('.list_of_open_orders');
  const utils_add_product_button_node = document.querySelector('.utils__add-product-button');
  const new_product_dialog_node = document.querySelector('.new_product_dialog');

  buttonOpenOrdersListMode.addEventListener('click', async () => {
    const [json, error] = await use_xml_http_request('orders');
    if (!!error) return use_toast(error, 'error');
    list_of_open_orders_node.style.display = 'grid';

    const statusesArr = get_order_statuses_arr();

    const validatedOrdersIdWithSatusessObj = JSON.parse(json).reduce((acc, { status, id }) => {
      return { ...acc, [status]: [...(acc[status] || []), id] };
    }, {});

    list_of_open_orders_node.innerHTML = `
      <div class='list_of_open_orders-content'>
        <div class='list_of_open_orders-content__title'>
          <p>${status} Orders list </p> <button class='close-button'>${closeSvg} </button>
        </div>
      <div class='list_of_open_orders-content__list'>
        ${statusesArr.map_join(
          (status) =>
            ` <div class='column' id='column_${status}'>
                <div  class='column_status' > ${status} </div>
                <div>
                  ${
                    validatedOrdersIdWithSatusessObj?.[status]?.map_join(
                      (id) =>
                        `<a class='column_item'  draggable="true" id='item_${id}' href='order_details.html?${id}'>${id}</a>`
                    ) || ''
                  } 
                </div>
                </div>
                `
        )} 
      </div>
      </div> 
    `;

    const columnItemsNodeArr = document.querySelectorAll('.column_item');
    const columnsNodeArr = document.querySelectorAll('.column');

    columnsNodeArr.forEach((el) => {
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      el.addEventListener('drop', async (e) => {
        const id = e.dataTransfer.getData('text');

        const ID = id.split('_')[1];

        const status = el.id.split('_')[1];
        const [res, error] = await use_xml_http_request(`orders?id=${ID}`, 'POST', JSON.stringify({ status }));

        if (!!error) {
          return use_toast(error, 'error');
        }

        const draggable_element = document.getElementById(id);

        draggable_element.style.background = 'rgb(229, 243, 255)';
        el.children[1].insertAdjacentElement('afterbegin', draggable_element);

        use_toast(res, 'info');
        e.dataTransfer.clearData();
      });
    });

    columnItemsNodeArr.forEach((el) => {
      const on_drag_start = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.currentTarget.style.backgroundColor = 'yellow';
      };

      el.addEventListener('dragstart', on_drag_start);
    });

    list_of_open_orders_node.querySelector('.close-button').addEventListener('click', () => {
      list_of_open_orders_node.style.display = 'none';
    });
  });
  const input_node = document.querySelector('.utils__search-input');

  const use_to_genegate_search_item_html = ({ name, id, image, caption }) => {
    return `
      <div class='item' id='${id}'>
        ${image ? `<img src=${image} ></img>` : ''}
        <p> ${name} </p> 
        <button class='item__edit-button' id='${caption + '||||' + id}'>
          ${editSvg}
        </button>
        ${
          caption.startsWith('C')
            ? ''
            : `<button class='item__delete-button'  id='${caption + '||||' + id}'>
            ${deleteSvg}`
        }
        </button>
      </div>`;
  };

  const set_up_search_items_util = () => {
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

    allEditButtonNodeArr?.forEach((el) => {
      el?.addEventListener('click', () => {
        (el.id.startsWith('C') ? set_up_changing_category : handle_open_product_edit_dialog)(el?.id);
      });
    });
  };

  set_up_search(
    [
      document.querySelector('.utils__search-result'),
      document.querySelector('.utils__search-svg-container'),
      input_node,
    ],
    (arr, caption) => arr.map_join((props) => use_to_genegate_search_item_html({ ...props, caption })),
    set_up_search_items_util
  );

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
      set_up_search_items_util();
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
    let { id, imgGallery, image, categories, _id, ...props } = JSON.parse(res);
    _id;
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
              <input class='input' placeholder='${to_capitalize(name)}' name='${name}' value='${value}'>

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

      const data = {
        ...Object.fromEntries([...new FormData(editingDialogNode.querySelector('form'))]),
        categories,
        imgGallery,
        image,
        id,
      };
      const empty_field = use_validation_of_all_field(data);

      if (!!empty_field) {
        return use_toast(empty_field + ' is empty ', 'error');
      }

      const [res, err] = await use_xml_http_request(`products?id=${id}`, 'POST', JSON.stringify(data));

      if (!!err) {
        return use_toast(err, 'error');
      }
      editingDialogNode.style.display = 'none';

      return use_toast(res, 'info');
    });
  };

  const handle_open_new_product_dialog = () => {
    new_product_dialog_node.style.display = 'grid';

    new_product_dialog_node.innerHTML = `
      <div class="new_product_dialog__content">
        <div class="new_product_dialog__content-title">
        <p>  Creating new product </p>
        <button class='close-button'>${closeSvg}</button>
        </div>
        <div class="new_product_dialog__content-gallery">
        <label>Images</label>
          <input  placeholder="Preview  Image" name="image" class='imgPreview input'>
          <input  placeholder="Image Gallery" name="imgGallery" class='imgGallery input'>

        </div>
        <div class="new_product_dialog__content-utils">
          <form>
          <label>Price, rating, name, size</label>
              <input class="input" placeholder="Price" name="price" >
              <input class="input" placeholder="Rating" name="rating" >
              <input class="input" placeholder="Name" name="name" >
              <input class="input" placeholder="Size" name="size">
          <div class="new_product_dialog__content-utils__categories">
            <label>
              Categories
            </label>
            <div class="new_product_dialog__content-utils__categories__content">
              <button class="category-button add-category-button">
                + Add category
              </button>
            </div>
          </div>
          <button class="button--contained new_product_dialog__content-utils__save-button">
            Save changes
          </button>
        </form></div>
      </div>
    `;

    const categoriesContentNode = document.querySelector('.new_product_dialog__content-utils__categories__content');
    const categoryMenuNode = document.querySelector('.categories_menu');

    set_up_category_menu(['add-category-button', [], categoryMenuNode, categoriesContentNode]);

    const saveButtonNode = new_product_dialog_node.querySelector('.new_product_dialog__content-utils__save-button');
    const closeButtonNode = new_product_dialog_node.querySelector('.close-button');

    closeButtonNode.addEventListener('click', () => {
      new_product_dialog_node.style.display = 'none';
    });

    saveButtonNode.addEventListener('click', async (e) => {
      e.preventDefault();

      const categories = [...new_product_dialog_node.querySelectorAll('.category-button')]
        .map((el) => el.getAttribute('category-id'))
        .filter((el) => !!el);

      const imgGallery = new_product_dialog_node
        .querySelector('.imgGallery')
        ?.value?.split(',')
        .filter((el) => !!el);

      const image = new_product_dialog_node.querySelector('.imgPreview')?.value;

      const data = {
        ...Object.fromEntries([...new FormData(new_product_dialog_node.querySelector('form'))]),
        categories,
        imgGallery,
        image,
      };

      const empty_field = use_validation_of_all_field(data);

      if (!!empty_field) {
        return use_toast(empty_field + ' is empty ', 'error');
      }

      const [res, err] = await use_xml_http_request(`new_product`, 'POST', JSON.stringify(data));

      if (!!err) {
        return use_toast(err, 'error');
      }
      new_product_dialog_node.style.display = 'none';

      return use_toast(res, 'info');
    });
  };

  utils_add_product_button_node.addEventListener('click', handle_open_new_product_dialog);
})();
