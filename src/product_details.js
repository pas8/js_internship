import './header&footer';
import '@styles/product_details.scss';
import '@components/product-details.web.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

(async () => {
  const ID = window.location.search.slice(1);
  const product_container = document.querySelector('.product-details-row.container');

  const [json, error] = await use_xml_http_request(`products?id=${ID}`);
  if (!!error) return console.error(error, 'error');

  const { name, description, image, price, categories, id, imgGallery, addition_propertyies,feedback } = JSON.parse(json);
console.log(feedback)
  product_container.innerHTML = `
    <product-details 
      caption='${name}'
      id='${id}' 
      categories='${categories.join(',')}'
      addition_propertyies='${JSON.stringify(addition_propertyies)}'
      image='${image}'
      gallery='${imgGallery.join(',')}'
      description="${description}"
      price='${price}'
    ></product-details>  `;
})();
