import { API_URL } from '@config/index';

export const use_product_promise = (idsArr) => {
  const promisesArr = idsArr.map(async (id) => {
    const data = await fetch(`${API_URL}/products?id=${id}`);
    return await data.json();
  });

  return Promise.all(promisesArr);
};
