import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { get_user } from '@utils/get_user.util.js';
import { get_user_token } from '@utils/get_user_token.util.js';

export const use_auth_and_get_user_props = async () => {
  const token = get_user_token();
  const [res, err] = await use_xml_http_request(`auth_user?${token}`);
  let is_auth;
  let user;

  if (!!err) {
    is_auth = false;
    return [is_auth, null, null];
  }
  const { id } = JSON.parse(res);
  is_auth = true;
  const [json, error] = await get_user(id);
  if (!!error) {
    return [is_auth, null, error];
  }
  user = JSON.parse(json);
  return [is_auth, user, null];
};
