import arrow_backSvg from '@svgs/arrow_back.svg';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_to_generate_categories_content_html } from '@utils/use_to_generate_categories_content_html.util.js';
import { use_toast } from '@utils/use_toast.util.js';

export const set_up_category_menu = ([className, categories, categoryMenuNode, categoriesContentNode]) => {
  const node = document.querySelector('.' + className);

  node.addEventListener('click', async (e) => {
    e.preventDefault();

    const [res, error] = await use_xml_http_request('all_children_categories');
    if (!!error) {
      return use_toast(error, 'error');
    }

    const { left, top, width } = node.getBoundingClientRect();
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
        selectedCategories = selectedCategories.filter((__) => {
          return __ != id;
        });
      });
    });

    closeButtonNodeNode.addEventListener('click', () => {
      categoryMenuNode.style.display = 'none';
    });
    saveButtonNodeNode.addEventListener('click', async () => {
      categories = selectedCategories;
      categoriesContentNode.innerHTML = await use_to_generate_categories_content_html(categories);
      set_up_category_menu([className, categories, categoryMenuNode, categoriesContentNode]);
    });
  });
};
