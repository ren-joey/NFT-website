import axios from 'axios';
import querystring from 'querystring';
import { ajaxMiddleware } from './ajaxMiddleware';

const ajax = async ({ method = 'get', url = '', params = {}, success = () => {}, fail = () => {}, final = () => {}, timeout = 30000, headers = { 'Content-Type': 'application/json', 'If-Modified-Since': '0', 'X-Requested-With': 'XMLHttpRequest' }, needStringify = true, formData = null }) => {
    const obj = {
        method,
        url,
        params,
        timeout,
        credentials: 'same-origin',
        headers
    };
    if (['post'].includes(method) && formData) {
        obj.data = formData;
    } else if (['post', 'put', 'delete'].includes(method)) {
        obj.data = needStringify ? querystring.stringify(params) : params;
    } else {
        obj.params = params;
    }

    return axios(obj)
        .then((res) => {
            const middlewareResponse = ajaxMiddleware(res);
            if (middlewareResponse.status === 'Y') {
                success(middlewareResponse.apiResponseData);
            } else {
                fail(middlewareResponse);
            }

            return res.data;
        })
        .catch((error) => {
            console.error(error);
            const middlewareResponse = ajaxMiddleware(error);
            fail(middlewareResponse);
        })
        .finally(() => {
            final();
        });
};

export { ajax as default };
export { ajax };
