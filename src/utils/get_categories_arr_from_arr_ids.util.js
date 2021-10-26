import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const get_categories_arr_from_arr_ids = async (categoriesIdsArr) => {
  let categoriesArr = [];

  (await Promise.all(categoriesIdsArr.map((id) => use_xml_http_request(`categories?id=${id}`)))).forEach(
    ([item, error]) => {
      !error && categoriesArr.push(JSON.parse(item));
    }
  );
  return categoriesArr;
};
