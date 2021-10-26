import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const get_user = async (id) => await use_xml_http_request(`user?id=${id}`);
