export const set_up_on_click_of_all_childrens = (parentNode,activeClass,onClickFunc,) => {

  [...parentNode.children].forEach((el) => {
    el.addEventListener('click', () => {
      [...parentNode.children].forEach((__) =>
        __.classList.remove(activeClass)
      );
      onClickFunc(el)
      el.classList.add(activeClass);
    });
  });

}


