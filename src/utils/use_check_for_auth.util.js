import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';

export const use_check_for_auth = async () => {
  const token = window.localStorage.getItem('token');

  const [, error] = await use_xml_http_request('admin', 'POST', JSON.stringify({ token }));

  if (!!error) {
    use_toast(error, 'error');
    return window.location.replace('/pages/auth.html');
  }
};
