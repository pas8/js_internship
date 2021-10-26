import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { get_user_token } from '@utils/get_user_token.util.js';

export const get_user = async () => {
  const token = get_user_token();

  return await use_xml_http_request(`user?${token}`);
};
