import '@styles/__ripple.scss';

export const set_up_button_ripple = (button_node, fn) => {
  button_node.insertAdjacentHTML('beforeend', `<span class='ripple'></span>`);

  const ripple_node = button_node.querySelector('.ripple');

  button_node.style.overflow = 'hidden';
  button_node.style.position = 'relative';

  button_node.addEventListener('click', (e) => {
    const { clientX, currentTarget, clientY } = e;
    const x = clientX - currentTarget.getBoundingClientRect().left;
    const y = clientY - currentTarget.getBoundingClientRect().top;

    ripple_node.style.display = 'flex';
    ripple_node.style.left = x + 'px';
    ripple_node.style.top = y + 'px';

    setTimeout(() => {
      ripple_node.style.display = 'none';
    }, 800);

    fn && fn({ ...e, clientX, currentTarget, clientY });
  });
};
