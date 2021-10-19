import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import closeSvg from '@svgs/close.svg';



export const set_up_new_category_dialog = () => {

  const utils_add_category_button_node = document.querySelector('.utils__add-category-button');
  const new_category_dialog_node = document.querySelector('.new_category_dialog');

  utils_add_category_button_node.addEventListener('click', () => {
    new_category_dialog_node.style.display = 'grid';

    new_category_dialog_node.innerHTML = `
        <div class="new_category_dialog__content">
          <div class="new_category_dialog__content-title">
            <p>Creating new category</p>       <button class='close-button'>${closeSvg}</button>
          </div>
        <div class="new_category_dialog__content-utils">

          <input class='input input_name' placeholder='Name' > 
          <button class="button--contained new_category_dialog__content-utils__save-button">
            Save changes
          </button>

        </div>
        </div>
        `;

    new_category_dialog_node
      .querySelector('.new_category_dialog__content-utils__save-button')
      .addEventListener('click', async () => {
        const name = new_category_dialog_node.querySelector('.input_name').value;
        if (!name) {
          return use_toast('Name is empty', 'error');
        }
        const [res, err] = await use_xml_http_request(`new_category`, 'POST', JSON.stringify({ name }));

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

}