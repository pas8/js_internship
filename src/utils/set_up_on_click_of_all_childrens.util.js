export const set_up_on_click_of_all_childrens = (parentNode, activeClass, onClickFunc) => {
  [...parentNode.children].forEach((el) => {
    el.addEventListener('click', () => {
      const is_active = (el?.classList.length === 2 ? el?.classList[1] : el?.classList[0])?.includes(activeClass);

      el.classList[!is_active ? 'add' : 'remove'](activeClass);
      onClickFunc(el);
    });
  });
};
