import '@styles/product_details.scss';
import '@components/product-details.web.js';
import './header&footer';
import { API_URL } from './config/index';

const ID = window.location.search.slice(1);

const product_container = document.querySelector('.product-details-row.container');

fetch(`${API_URL}/products/${ID}`)
  .then((res) => res.json())
  .then(({ title, description, image, price, rating, category, id }) => {
    product_container.innerHTML = `
    <product-details 
      title='${title}'
      id='${id}' 
      category='${category}'
      image='${image}'
      description='${description}'
      price='${price}'
      rating-value='${rating.rate}'
      rating-count='${rating.count}'
    ></product-details>  `;
  });
