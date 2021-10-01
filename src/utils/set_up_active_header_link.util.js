export const set_up_active_header_link = () => {
  //!to refactor this shit

  const findedLink = [...document.querySelector('.main-row__links').childNodes]
    .filter((__, idx) => !(idx & 1))
    .find((el) =>
      el.classList[1] === window.location.pathname.startsWith('/dist')
        ? window.location.pathname.split('/')[2].split('.')[0] === 'index'
          ? '/'
          : window.location.pathname.split('/')[2].split('.')[0]
        : window.location.pathname
    );
  findedLink && findedLink.classList.add('main-row__links__link-wrapper--active');
  // console.log(findedLink);
};
