export const set_up_login_user_values_of_checkout_from = (props) => {
  const _form_node = document.querySelector('.form');
  const arr = [..._form_node.querySelectorAll('.input')];

  arr.forEach((el) => {
    const name = el.getAttribute('name');

    if (!!props[name]) {

      el.value = props[name];
      name === 'email' &&    el.setAttribute('readonly','')
    }
  });
};
