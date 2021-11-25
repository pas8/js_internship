export const set_up_header_burger = () => {
  const headerMenuButtonNode = document.querySelector('.menu-button');
  const headerNode = document.querySelector('header');
  
  let isHeaderMenuOpen = false;
  headerMenuButtonNode.addEventListener('click', () => {
    isHeaderMenuOpen = !isHeaderMenuOpen;
    isHeaderMenuOpen ? (headerNode.classList = 'open header') : (headerNode.classList = 'closed header');
    headerMenuButtonNode.innerHTML = !isHeaderMenuOpen
      ? `<svg viewBox="0 0 24 24" ><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path></svg>`
      : `<svg viewBox="0 0 24 24" ><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'></path></svg>`;
  });

}