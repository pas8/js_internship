export const get_default_product_attribute_values = (paramThis) => {
  const img_href = paramThis.getAttribute('img_href');
  const id = paramThis.getAttribute('id') || 'randomId';
  const caption = paramThis.getAttribute('caption');
  const current_price = paramThis.getAttribute('current_price');
  const old_price = paramThis.getAttribute('old_price');

  return [img_href, id, caption, current_price, old_price];
};
