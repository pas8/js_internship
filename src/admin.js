import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/admin.scss';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';
import { use_toast } from '@utils/use_toast.util.js';


(async () => {
  const token = window.localStorage.getItem('token');

  const [res, error] = await use_xml_http_request('admin', 'POST', JSON.stringify({ token }));
  if (error) {
    use_toast(error, 'error');
    return window.location.replace('pages/auth.html');
  }
  console.log(res);
  set_up_search([
    document.querySelector('.utils__search'),
    document.querySelector('.utils__search-svg-container'),
    document.querySelector('.utils__search-input'),
  ]);
})();
