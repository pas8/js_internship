import { get_product_component_variant } from '@utils/get_product_component_variant.util.js';

export const use_validate_view_of_product = ({ image, name, id, price, description }) => {
  const product_component_variant = get_product_component_variant();

  return `<${product_component_variant} img_href='${image}' id='${id}' caption='${name}' current_price='${price}' description='${description}' ></${product_component_variant}>`;
};
