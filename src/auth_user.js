import 'regenerator-runtime/runtime.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

(async () => {
  const token = window.location.search;

  const [, err] = await use_xml_http_request(`auth_user${token}`);
  let node = document.body.children[0].children[1];
  if (!!err) {
    return (node.innerHTML = `<h1>${err}</h1>`);
  }
  window.localStorage.setItem('user_token', token.split('?')[1]);
  alert()
  const is_redirect  = confirm('All right, redict ro the profile page?')
  is_redirect && window.location.replace('/pages/user_profile.html')

})();
