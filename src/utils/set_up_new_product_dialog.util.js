import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import { convert_arr_values_to_obj } from '@utils/convert_arr_values_to_obj.util.js';
import { set_up_addition_propertyies_utils } from '@utils/set_up_addition_propertyies_utils.util.js';

import { use_validation_of_all_field } from '@utils/use_validation_of_all_field.util.js';
import { set_up_category_menu } from '@utils/set_up_category_menu.util.js';
import closeSvg from '@svgs/close.svg';

export const set_up_new_product_dialog = () => {
  const new_product_dialog_node = document.querySelector('.new_product_dialog');
  const utils_add_product_button_node = document.querySelector('.utils__add-product-button');

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
          <label>Price,  name, size, color, description</label>
              <input class="input" placeholder="Price" name="price" >
              <input class="input" placeholder="Name" name="name" >
              <input class="input" placeholder="Size" name="size">
              <input class="input"  name="color" type="color">
              <textarea   name='description' class='input' rows='4' placeholder='Description'>  </textarea>

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
          <div class="new_product_dialog__content-addition_propertyies">
            <label>Addition propertyies</label>
            <button class="new_product_dialog__content-addition_propertyies__new_field_button">+ New field</button>
  
          </div>
          <button class="button--contained new_product_dialog__content-utils__save-button">
          + Add new product
          </button>
        </form></div>
      </div>
    `;

    const categoriesContentNode = document.querySelector('.new_product_dialog__content-utils__categories__content');
    const categoryMenuNode = document.querySelector('.categories_menu');

    set_up_addition_propertyies_utils('new_product_dialog__content-addition_propertyies');
    set_up_category_menu(['add-category-button', [], categoryMenuNode, categoriesContentNode]);

    const saveButtonNode = new_product_dialog_node.querySelector('.new_product_dialog__content-utils__save-button');
    const closeButtonNode = new_product_dialog_node.querySelector('.close-button');

    closeButtonNode.addEventListener('click', () => {
      new_product_dialog_node.style.display = 'none';
    });

    saveButtonNode.addEventListener('click', async (e) => {
      e.preventDefault();
      const addition_propertyies_node = new_product_dialog_node.querySelector(
        '.new_product_dialog__content-addition_propertyies'
      );
      const addition_propertyies_inputs_node_arr = [...addition_propertyies_node.querySelectorAll('input')];

      if (addition_propertyies_inputs_node_arr.some((el) => !el.value)) {
        return use_toast('Some addition properties field is empty ', 'error');
      }

      const addition_propertyies = convert_arr_values_to_obj(addition_propertyies_inputs_node_arr);

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

      const [res, err] = await use_xml_http_request(
        `new_product`,
        'POST',
        JSON.stringify({ ...data, addition_propertyies })
      );

      if (!!err) {
        return use_toast(err, 'error');
      }
      new_product_dialog_node.style.display = 'none';

      return use_toast(res, 'info');
    });
  };

  utils_add_product_button_node.addEventListener('click', handle_open_new_product_dialog);
};
