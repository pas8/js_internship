import { API_URL } from '@config/index.js';

export const use_xml_http_request = async (endUrl, method = 'GET', body) => {

  return await new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, `${API_URL}/${endUrl}`, true);

    xhr.onload = () => {
      if (xhr.status != 200) return resolve([null, xhr.statusText]);
      return resolve([xhr.response, null]);
    };
    xhr.onerror = () => {
      resolve([null, xhr.statusText]);
    };
    xhr.send(body);
  });
};
