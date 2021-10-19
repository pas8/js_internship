import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import closeSvg from '@svgs/close.svg';

export const set_up_new_category_dialog = () => {
  const utils_add_category_button_node = document.querySelector('.utils__add-category-button');
  const new_category_dialog_node = document.querySelector('.new_category_dialog');

  utils_add_category_button_node.addEventListener('click', async () => {
    new_category_dialog_node.style.display = 'grid';

    const [json, err] = await use_xml_http_request('all_parent_categories');
    if (err) {
      return console.log(err);
    }
    const all_parent_categories_arr = JSON.parse(json);

    const genegate_list_of_parent_options = () => `<select name='parentId' class='input'>
      <option value='plaecholder'> Chouse parent category
      </option>
      ${all_parent_categories_arr.map_join(({ id, name }) => `<option value='${id}'> ${name}</option>`)}
    </select>`;

    new_category_dialog_node.innerHTML = `
        <div class="new_category_dialog__content">
          <div class="new_category_dialog__content-title">
            <p>Creating new category</p>       <button class='close-button'>${closeSvg}</button>
          </div>
        <div class="new_category_dialog__content-utils">

          <input class='input input_name' placeholder='Name' > 
          <div class='dynamic_input_wrapper'>${genegate_list_of_parent_options()}</div>
          <div>  <input name='isParent' type='checkbox' class='input_isParent' >
          <label for='isParent'>Is parent?</label> 
          </div>
          <button class="button--contained new_category_dialog__content-utils__save-button">
+ Add
          </button>

        </div>
        </div>
        `;

    const dynamic_input_wrapper_node = new_category_dialog_node.querySelector('.dynamic_input_wrapper');

    new_category_dialog_node.querySelector('.input_isParent').addEventListener('input', ({ target: { checked } }) => {
      dynamic_input_wrapper_node.innerHTML = !checked
        ? genegate_list_of_parent_options()
        : `<input class='input input_d' placeholder='Path of svg' ></input>`;
    });

    new_category_dialog_node
      .querySelector('.new_category_dialog__content-utils__save-button')
      .addEventListener('click', async () => {
        const dynamic_input_node = [...dynamic_input_wrapper_node.children][0];
        const isParent = dynamic_input_node.classList.contains('input_d');

        const name = new_category_dialog_node.querySelector('.input_name').value;
        if (!name) {
          return use_toast('Name is empty', 'error');
        }

        if (!dynamic_input_node.value || dynamic_input_node.value === 'placeholder') {
          return use_toast(isParent ? 'Chouse parent category' : 'Svg path  is empty', 'error');
        }

        const [res, err] = await use_xml_http_request(
          `new_category`,
          'POST',
          JSON.stringify({ name, [isParent ? 'd' : 'parentId']: dynamic_input_node.value, isParent })
        );

        if (!!err) {
          return use_toast(err, 'error');
        }

        new_category_dialog_node.style.display = 'none';

        return use_toast(res, 'info');
      });

    new_category_dialog_node.querySelector('.close-button').addEventListener('click', () => {
      new_category_dialog_node.style.display = 'none';
    });
  });
};
