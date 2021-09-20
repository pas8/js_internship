import './styles/_header.scss'
import './styles/_footer.scss'

const findedLink = [...document.querySelector('.main-row__links').childNodes]
  .filter((__, idx) => !(idx & 1))
  .find((el) => el.classList[1] === window.location.pathname);

findedLink.classList.add('main-row__links__link-wrapper--active');

const favouriteNode = document.querySelector('.button-favourite');
const basketNode = document.querySelector('.button-basket');

favouriteNode.classList.add('with-label');
favouriteNode.setAttribute('data-label', '42');

basketNode.classList.add('with-label');
basketNode.setAttribute('data-label', '8');