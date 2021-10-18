import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';


export const use_to_generate_categories_content_html = async (categories) => {
  const resArr = await Promise.all(categories.map((id) => use_xml_http_request(`categories?id=${id}`)));
  const categoriesResultArr = resArr.filter(([res, err]) => !!res && !err).map(([res]) => JSON.parse(res));

  return `
    ${categoriesResultArr.map_join(
      ({ name, id }) => `
        <button category-id='${id}' class='category-button'>
          ${name}
        </button>
      `
    )}
    <button  class='category-button add-category-button'>
      + Add category
    </button>
  `;
};
