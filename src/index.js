import Glide from '@glidejs/glide';
import { API_URL } from './config/index';

import './styles/index.scss';
import './header&footer';
new Glide('.glide').mount();

import '@components/special-product.web.js';
import '@components/time-left.web.js';
import '@components/masonry-layout.web.js';
import '@components/tab-panel.web.js';

const categoriesContainer = document.querySelector('.categories-row');

fetch(`${API_URL}/products`)
  .then((res) => res.json())
  .then((json) => {
    const categoriesArr = json.filter((__, idx) => idx < 6);
    categoriesContainer.innerHTML = `
      ${categoriesArr.map(
        ({ image, title ,id}) =>
          `<a class="categories-row__item" href='/product_details.html?${id}'> <img src='${image}'><p>${title.split(' ')
            .filter((__, idx) => idx < 2)
            .join(' ')}</p></a>`
      ).join('')}
    `;
  });
