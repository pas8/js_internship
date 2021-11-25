import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/auth.scss';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';

const form = document.querySelector('.form');

const [loginNode, passwordNode, submitButtonNode] = form.children;

submitButtonNode.addEventListener('click', async (e) => {
  e.preventDefault();

  const [token, error] = await use_xml_http_request(
    'auth',
    'POST',
    JSON.stringify({ login: loginNode?.value || '', password: passwordNode?.value || '' })
  );
  if (!!error) {
    return use_toast(error, 'error');
  }
  window.localStorage.setItem('token', JSON.parse(token));
  window.location.replace('/pages/admin.html')

});
