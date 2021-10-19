import deleteSvg from '@svgs/delete.svg';

export const set_up_addition_propertyies_utils = (class_name) => {
  const new_field_button_node = document.querySelector(`.${class_name}__new_field_button`);

  new_field_button_node.addEventListener('click', (e) => {
    e.preventDefault();
    new_field_button_node.insertAdjacentHTML(
      'beforebegin',
      `
        <div class="${class_name}__field">
          <input class="${class_name}__field_key_input input" placeholder='Key' name='key'></input>
          <input class="${class_name}__field_value_input input" placeholder='Value' name='value'></input>
          <button class="${class_name}__remove_filed_button">
            ${deleteSvg}
          </button>
        </div>
      `
    );

    const delete_field_button_node_arr = document.querySelectorAll(`.${class_name}__remove_filed_button`);

    delete_field_button_node_arr.forEach((el) => {
      el.addEventListener('click', () => {
        el.parentElement.remove();
      });
    });
  });
};
