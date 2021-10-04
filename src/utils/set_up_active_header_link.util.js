export const set_up_active_header_link = () => {
  const pathname = window.location.pathname.split('/');
  const linksNodesArr = [...document.querySelector('.main-row__links').childNodes];

  linksNodesArr
    ?.find((el) => [...el.classList][1] === pathname[pathname.length - 1])
    ?.classList.add('main-row__links__link-wrapper--active');
};
