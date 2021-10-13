import '@styles/product_details.scss';
import '@components/product-details.web.js';
import './header&footer';
import { API_URL } from './config/index';

const ID = window.location.search.slice(1);
const product_container = document.querySelector('.product-details-row.container');

fetch(`${API_URL}/products?id=${ID}`)
  .then(async (res) => {
    return await res?.json();
  })
  .then(({ name, description, image, price, category, id,imgGallery }) => {
    product_container.innerHTML = `
    <product-details 
      caption='${name}'
      id='${id}' 
      category='${category}'
      image='${image}'
      gallery='${imgGallery.join(',')}'
      description='${description}'
      price='${price}'
    ></product-details>  `;
  });
// rating-value='${rating.rate}'
// rating-count='${rating.count}'
