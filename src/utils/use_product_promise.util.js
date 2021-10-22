import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const use_product_promise = (idsArr) => {
  const promisesArr = idsArr.map(async (id) => {
    const [data] = await use_xml_http_request(`products?id=${id}`);
    return await JSON.parse(data);
  });

  return Promise.all(promisesArr);
};
