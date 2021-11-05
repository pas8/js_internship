import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const get_global_user_info = async (id) => {
  const [json, error] = await use_xml_http_request(`global_user_info?id=${id}`);

  if (!!error) return { id, name: 'unknown' };
  return JSON.parse(json);
};
