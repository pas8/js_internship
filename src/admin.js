import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/admin.scss';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { use_check_for_auth } from '@utils/use_check_for_auth.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import { to_capitalize } from '@utils/to_capitalize.util.js';
import deleteSvg from '@svgs/delete.svg';
import closeSvg from '@svgs/close.svg';
import editSvg from '@svgs/edit.svg';
import arrow_backSvg from '@svgs/arrow_back.svg';
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();
use_check_for_auth();

(async () => {
  const buttonOpenOrdersListMode = document.querySelector('.utils__open-orders-list');
  const list_of_open_orders_node = document.querySelector('.list_of_open_orders');

  buttonOpenOrdersListMode.addEventListener('click', async () => {
    const [arr, error] = await use_xml_http_request('open_orders');
    if (!!error) return use_toast(error, 'error');
    list_of_open_orders_node.style.display = 'grid';

    list_of_open_orders_node.innerHTML = `
      <div class='list_of_open_orders-content'>
        <div class='list_of_open_orders-content__title'>
          <p>${status} orders</p> <button class='close-button'>${closeSvg} </button>
        </div>
      <div class='list_of_open_orders-content__list'>
        ${JSON.parse(arr).map_join(
          ({ _id, status, ...props }) =>
            `<div class='id'>id:${_id}</div>
            ${Object.entries(props).map_join(
              ([caption, value]) => `
              <div class='row_of_props'>
                <p class='row_of_props-caption'>${caption}</p>
                <div class='row_of_props-container'>
                  ${
                    caption === 'products'
                      ? value
                      : Object.entries(value).map_join(
                          ([key, val]) =>
                            `<div class='item'><p class='item-key'>${key}:</p><p class='item-value'>${val}</p>  </div>`
                        )
                  }
                </div>
              </div>
            `
            )}
            <div class='current_status'>Status:${status}</div>
            <select id='${_id + 'status'}'>
              <option value='change_status'>Change status</option>
              <option value='open'>Open</option>
              <option value='shipping'>Shipping</option>
              <option value='arrived'>Arrived</option>
              <option value='closed'>Closed</option>
            </select>
            `
        )}
      </div>
      </div> 
    `;
    list_of_open_orders_node.querySelector('.close-button').addEventListener('click', () => {
      list_of_open_orders_node.style.display = 'none';
    });
  });

  set_up_search(
    [
      document.querySelector('.utils__search-result'),
      document.querySelector('.utils__search-svg-container'),
      document.querySelector('.utils__search-input'),
    ],
    (arr, caption) =>
      arr.map_join(
        ({ name, id, image }) => `
          <div class='item'>
            ${image ? `<img src=${image} ></img>` : ''}
            <p> ${name} </p> 
            <button class='item__edit-button' id='${caption + '||||' + id}'>
              ${editSvg}
            </button>
            <button class='item__delete-button'  id='${caption + '||||' + id}'>
              ${deleteSvg}
            </button>
          </div>`
      ),
    () => {
      const allDeleteButtonNodeArr = document.querySelectorAll('.item__delete-button');
      const allEditButtonNodeArr = document.querySelectorAll('.item__edit-button');

      [...allDeleteButtonNodeArr]?.forEach((el) => {
        el?.addEventListener('click', async () => {
          const [href, queryId] = el.id.split('||||');

          const [res, err] = await use_xml_http_request(`${href.toLowerCase()}?id=${queryId}`, 'DELETE');

          if (!!err) {
            return use_toast(err, 'error');
          }
          return use_toast(res, 'info');
        });
      });

      allEditButtonNodeArr?.forEach((el) => {
        el?.addEventListener('click', () => {
          handle_open_edit_dialog(el?.id);
        });
      });
    }
  );

  const handle_open_edit_dialog = async (str) => {
    const editingDialogNode = document.querySelector('.editing_dialog');
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

    const use_to_generate_categories_content_html = async () => {
      const resArr = await Promise.all(categories.map((id) => use_xml_http_request(`categories?id=${id}`)));
      const categoriesResultArr = resArr.filter(([res, err]) => !!res && !err).map(([res]) => JSON.parse(res));

      return `
        ${categoriesResultArr.map_join(
          ({ name, id }) => `
            <button category-id='${id}' class='category-button'>
              ${name}
            </button>
          `
        )}
        <button  class='category-button add-category-button'>
          + Add category
        </button>
      `;
    };
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
              ${await use_to_generate_categories_content_html()}
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
    const addCategoryButtonNode = editingDialogNode.querySelector('.add-category-button');

    const categoriesContentNode = document.querySelector('.editing_dialog__content-utils__categories__content');

    const categoryMenuNode = document.querySelector('.categories_menu');

    addCategoryButtonNode.addEventListener('click', async (e) => {
      e.preventDefault();

      const [res, error] = await use_xml_http_request('categories');
      if (!!error) {
        return use_toast(error, 'error');
      }

      const { left, top, width } = addCategoryButtonNode.getBoundingClientRect();
      categoryMenuNode.style.display = 'flex';
      categoryMenuNode.style.top = top + 'px';
      categoryMenuNode.style.left = left + width + 'px';

      let selectedCategories = [...categories];

      categoryMenuNode.innerHTML = `
        <div class='categories_menu-utils'>
          <button class='categories_menu-utils__close-button close-button'>
            ${arrow_backSvg}
          </button>
          <button class='categories_menu-utils__save-button button--contained'>
            Save 
          </button>
        </div>
      ${JSON.parse(res).map_join(
        ({ name, id }) =>
          `<button class='category_menu-item-button ${
            categories.includes(id) ? 'category_menu-item-button--selected' : ''
          }' category-id='${id}'>${name} </button>`
      )}
        `;

      const closeButtonNodeNode = document.querySelector('.categories_menu-utils__close-button');
      const saveButtonNodeNode = document.querySelector('.categories_menu-utils__save-button');
      const categoryMenuItemButtonNodeArr = document.querySelectorAll('.category_menu-item-button');

      categoryMenuItemButtonNodeArr.forEach((el) => {
        el.addEventListener('click', () => {
          const id = el.getAttribute('category-id');

          const isSelected = selectedCategories.includes(id);
          if (!isSelected) {
            el.classList.add('category_menu-item-button--selected');

            return selectedCategories.push(id);
          }
          el.classList.remove('category_menu-item-button--selected');
          selectedCategories = selectedCategories.filter((__) => __ != id);
        });
      });

      closeButtonNodeNode.addEventListener('click', () => {
        categoryMenuNode.style.display = 'none';
      });
      saveButtonNodeNode.addEventListener('click', async () => {
        categories = selectedCategories;
        categoriesContentNode.innerHTML = await use_to_generate_categories_content_html();
      });
    });

    closeButtonNode.addEventListener('click', () => {
      editingDialogNode.style.display = 'none';
    });

    saveButtonNode.addEventListener('click', async (e) => {
      e.preventDefault();

      const [res, err] = await use_xml_http_request(
        `products?id=${id}`,
        'POST',
        JSON.stringify({
          ...Object.fromEntries([...new FormData(editingDialogNode.querySelector('form'))]),
          categories,
          imgGallery,
          image,
          id,
        })
      );

      if (!!err) {
        return use_toast(err, 'error');
      }
      editingDialogNode.style.display = 'none';

      return use_toast(res, 'info');
    });
  };
})();
