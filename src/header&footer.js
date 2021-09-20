import './styles/_header.scss';
import './styles/_footer.scss';
import '@components/social-utils.web.js';
import { convert_rem_to_pixels } from '@utils/convert_rem_to_pixels.util.js';

const findedLink = [...document.querySelector('.main-row__links').childNodes]
  .filter((__, idx) => !(idx & 1))
  .find((el) => el.classList[1] === window.location.pathname);

findedLink.classList.add('main-row__links__link-wrapper--active');
console.log();

const favouriteNode = document.querySelector('.button-favourite');
const basketNode = document.querySelector('.button-basket');

const headerMenuButtonNode = document.querySelector('.menu-button');
const headerNode = document.querySelector('header')

let isHeaderMenuOpen = false;
headerMenuButtonNode.addEventListener('click', () => {
  isHeaderMenuOpen = !isHeaderMenuOpen;
  isHeaderMenuOpen ?  headerNode.classList = 'open header' :  headerNode.classList ='closed header' 
  headerMenuButtonNode.innerHTML = !isHeaderMenuOpen
    ? `<svg viewBox="0 0 24 24" ><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path></svg>`
    : `<svg viewBox="0 0 24 24" ><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'></path></svg>`;

});



// if (convert_rem_to_pixels(46) > window.innerWidth) {
// headerNode.childNodes.forEach((el) => (el.style.display = 'none'));
// }
// else {
// headerNode.childNodes.forEach((el) => (el.style.display = 'flex'));
// }

favouriteNode.classList.add('with-label');
favouriteNode.setAttribute('data-label', '42');

basketNode.classList.add('with-label');
basketNode.setAttribute('data-label', '8');
