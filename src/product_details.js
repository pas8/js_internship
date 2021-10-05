import '@styles/product_details.scss';
import '@components/product-details.web.js';
import './header&footer';
import { API_URL } from './config/index';

const ID = window.location.search.slice(1);
const product_container = document.querySelector('.product-details-row.container');

fetch(`${API_URL}/products/${ID}`)
  .then((res) => res.json())
  .then(({ name, description, image, price, category, id }) => {
    product_container.innerHTML = `
    <product-details 
      caption='${name}'
      id='${id}' 
      category='${category}'
      image='${image}'
      description='${description}'
      price='${price}'
    ></product-details>  `;
  });
// rating-value='${rating.rate}'
// rating-count='${rating.count}'
