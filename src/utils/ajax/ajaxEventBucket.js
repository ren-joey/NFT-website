/**
 * 先呼叫eventBucket => action = 'request'
 * api回來後，再次呼叫eventBucket => action = 'Finish_#SEC'/ timeout_#SEC / fail_errCode / fail_undefined
 *
 */

import axios from 'axios';
import querystring from 'querystring';
import { eventBucket } from './eventBucket';
import { gtmEventLog } from './gtmEventLog';
import { gtmSender } from '../ga/gtmSender';
import { ajaxMiddleware } from './ajaxMiddleware';

const ajaxEventBucket = async (
    {
        method = 'get',
        url = '',
        params = {},
        success = () => {},
        fail = () => {},
        final = () => {},
        timeout = 30000,
        headers = { 'Content-Type': 'application/json', 'If-Modified-Since': '0', 'X-Requested-With': 'XMLHttpRequest' },
        needStringify = true,
        formData = null
    },
    eventBucketSetting
) => {
    const startTime = new Date().getTime();
    eventBucket({ ...eventBucketSetting, Action: 'request' });
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
            const endTime = new Date().getTime();
            const passTime = Math.ceil((endTime - startTime) / 1000);

            if (middlewareResponse.status === 'Y') {
                eventBucket({ ...eventBucketSetting, Action: `Finish_${passTime}s` });
                success(middlewareResponse.apiResponseData);
            } else {
                const { data } = middlewareResponse.apiResponseData;

                // GTM 發送器
                gtmSender({ action: '-LOG', error: data.code });
                gtmEventLog({ action: '-LOG', error: `${eventBucketSetting.API}_${data.code}` });

                fail(middlewareResponse);
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);

            const middlewareResponse = ajaxMiddleware(error);
            const endTime = new Date().getTime();
            const passTime = Math.ceil((endTime - startTime) / 1000);

            // GTM 發送器
            gtmEventLog({ action: '-LOG', error: `TYPE-${middlewareResponse.type}_${passTime}`, memo: eventBucketSetting.API });

            fail(middlewareResponse);
        })
        .finally(() => {
            final();
        });
};

export { ajaxEventBucket as default };
export { ajaxEventBucket };
