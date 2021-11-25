export const set_up_active_header_link = () => {
  const window_pathname = window.location.pathname;
  const pathname = window_pathname.split('/');
  const linksNodesArr = [...document.querySelector('.main-row__links').childNodes];

  linksNodesArr
    ?.find(
      (el, idx) => (idx === 0 && window_pathname === '/') || [...el.classList][1] === pathname[pathname.length - 1]
    )
    ?.classList.add('main-row__links__link-wrapper--active');
};
