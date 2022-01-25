const alertTrigger = ({ type, apiResponseData }) => {
    const apiAlert = (...content) => {
        const str = content.join('');
        let code = '';

        if (type === 1) code = '【error code: TYPE-1】';
        else if (type === 2) code = '【error code: TYPE-2】';
        else if (type === 3) code = '【error code: TYPE-3】';
        else if (type === 4) code = '【error code: TYPE-4】';
        else {
            code = apiResponseData && apiResponseData.data && apiResponseData.data.code
                ? `【error code：${apiResponseData.data.code}】` : '';
        }
        alert(`${str}${code}`);
    };

    if (type !== 5) {
        switch (type) {
            case 1:
                apiAlert(
                    '很抱歉，目前系统繁忙中，请五分钟后再试，若仍无法成功领奖，请联系客服，敬请见谅 \n\n',
                    'The system is busy, please try again after 5 minutes.\nIf you still do not receive the award, please contact online customer service.'
                );
                break;
            case 2:
                apiAlert(
                    '目前系统维护中，请于维护后再参与活动 \n\n',
                    'The system is under maintenance, please join the event again after maintenance.'
                );
                break;
            case 3:
                apiAlert(
                    '很抱歉，目前系统繁忙中，请五分钟后再试，若仍无法成功领奖，请联系客服，敬请见谅 \n\n',
                    'The system is busy, please try again after 5 minutes.\nIf you still do not receive the award, please contact online customer service.'
                );
                break;
            case 4:
                apiAlert(
                    '很抱歉，目前系统繁忙中，请五分钟后再试，若仍无法成功领奖，请联系客服，敬请见谅 \n\n',
                    'The system is busy, please try again after 5 minutes.\nIf you still do not receive the award, please contact online customer service.'
                );
                break;
            default:
                apiAlert(
                    '很抱歉，目前系统繁忙中，请五分钟后再试，若仍无法成功领奖，请联系客服，敬请见谅 \n\n',
                    'The system is busy, please try again later.'
                );
                break;
        }
    } else {
        switch (apiResponseData.data.code) {
            case 111030300:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030301:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030302:
                apiAlert(
                    '非活动时间 \n\n',
                    'The event is currently not available.'
                );
                break;
            case 111030303:
                apiAlert(
                    '非活动时间 \n\n',
                    'The event is currently not available.'
                );
                break;
            case 111030304:
                // apiAlert(
                //     'Session异常，请重新登入参与活动 \n\n',
                //     'Please log in to participate the event.'
                // );
                break;
            case 111030305:
                apiAlert(
                    '您所属的网站未开放参与活动，请洽客服询问 \n\n',
                    'Your website doesn\'t participate the event. Please contact online customer service.'
                );
                window.close();
                break;
            case 111030306:
                apiAlert(
                    '您的账号不能参与活动，请洽客服询问 \n\n',
                    'Sorry, this event is not available for your account to participate. Please contact online customer service.'
                );
                window.close();
                break;
            case 111030307:
                apiAlert(
                    '很抱歉，本次活动限人民币会员参加 \n\n',
                    'Sorry, only the accounts bet with RMB can join the event.'
                );
                window.close();
                break;
            case 111030308:
                apiAlert(
                    '您的账号不能参与活动，请洽客服询问 \n\n',
                    'Sorry, this event is not available for your account to participate. Please contact online customer service.'
                );
                window.close();
                break;
            case 111030309:
                apiAlert(
                    '您所使用的账号为测试体系，不能参与活动 \n\n',
                    'This event is not available for testing accounts to participate.'
                );
                window.close();
                break;
            case 111030310:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030311:
                apiAlert(
                    '非活动时间 \n\n',
                    'The event is currently not available.'
                );
                window.location.reload();
                break;
            case 111030312:
                apiAlert(
                    '',
                    ''
                );
                break;
            case 111030313:
                apiAlert(
                    '未开启前一个位数奖金，将进行网页重新整理以保障您活动权益 \n\n',
                    'The number of the previous digit is not opened, the page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030314:
                apiAlert(
                    '您已开启该位数奖金，将进行网页重新整理以保障您活动权益 \n\n',
                    'The number of this digit has been opened, the page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030315:
                apiAlert(
                    '您的投注点数尚未达标 \n\n',
                    'Your betting points haven\'t reached the goal to claim rewards.'
                );
                window.location.reload();
                break;
            case 111030316:
                apiAlert(
                    '您的活动网页数据未更新，将进行网页重新整理以保障您活动权益 \n\n',
                    'The page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030317:
                apiAlert(
                    '您的活动网页数据未更新，将进行网页重新整理以保障您活动权益 \n\n',
                    'The page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030318:
                apiAlert(
                    '非活动时间 \n\n',
                    'The event is currently not available.'
                );
                window.location.reload();
                break;
            case 111030319:
                apiAlert(
                    '您已领奖，将进行网页重新整理以保障您活动权益 \n\n',
                    'You have received award. The page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030320:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030321:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030322:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                window.location.reload();
                break;
            case 111030323:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030324:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030325:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030326:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030327:
                apiAlert(
                    '您的活动网页数据未更新，将进行网页重新整理以保障您活动权益 \n\n',
                    'The page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030328:
                apiAlert(
                    '您距离上次领奖时间未达5分钟，请稍后重新整理网页再次进行领奖 \n\n',
                    'Please wait for 5 minutes to claim the event reward again.'
                );
                window.location.reload();
                break;
            case 111030329:
                apiAlert(
                    '活动限量奖励已全数发送完毕 \n\n',
                    'All of the event reward has already been claimed in this event.'
                );
                window.location.reload();
                break;
            case 111030330:
                apiAlert(
                    '该等级限量奖励已发送完毕，将重整活动页更新目前奖励剩余数量 \n\n',
                    'The event reward has already claimed. The page will be refreshed immediately.'
                );
                window.location.reload();
                break;
            case 111030331:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030332:
                apiAlert(
                    '很抱歉，您的领奖次数已达本活动上限；详情见活动说明 \n\n',
                    'Sorry, you have reached the maximum times of claiming rewards, please refer to the event rule.'
                );
                window.location.reload();
                break;
            case 111030333:
                apiAlert(
                    '您的活动网页数据未更新，将进行网页重新整理以保障您活动权益 \n\n',
                    'The page will be refreshed immediately.'
                );
                break;
            case 111030334:
                apiAlert(
                    '该奖项已被其他会员领取，请再次进行领奖 \n\n',
                    'This reward has already been claimed, please try again.'
                );
                break;
            case 111030335:
                apiAlert(
                    '该奖项已被其他会员领取，请再次进行领奖 \n\n',
                    'This reward has already been claimed, please try again.'
                );
                break;
            case 111030336:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030337:
                apiAlert(
                    '系统错误，请联络客服 \n\n',
                    'System Error. Please contact online customer service.'
                );
                break;
            case 111030338:
                apiAlert(
                    '活动限量奖励已全数发送完毕 \n\n',
                    'All of the event reward has already been claimed in this event.'
                );
                window.location.reload();
                break;
            default:
                apiAlert(apiResponseData.data.message);
                break;
        }
    }
};
/**
 *
 * @param { Object } res axios response
 * @example api 成功
 *  status:'Y', // api狀態
 *  apiResponseData:Object // api回傳資料
 * @returns { Object } Object
 *
 * @example api失敗
 *  status: 'N', // api狀態
 *  type: 1 // 錯誤類型
 *  message:'empty response', // 錯誤訊息
 *  apiResponseData: Object // api回傳資料
 * @returns { Object } Object
 *
 */
const ajaxMiddleware = (res) => {
    const result = {
        status: 'Y',
        apiResponseData: {}
    };

    //  api 成功
    if (res && res.data && res.data.status === 'Y') {
        result.apiResponseData = res.data;
        return result;
    }

    // error | fail
    if (!res) {
        // 回傳無內容
        result.status = 'N';
        result.type = 1;
        result.message = 'empty response';
        result.apiResponseData = res;
        alertTrigger(result);
        return result;
    }

    if (typeof res.data === 'string' && res.data.indexOf('/upup/upup.php') !== -1) {
        // serve error
        result.status = 'N';
        result.type = 2;
        result.message = 'serve error';
        result.apiResponseData = res;
        alertTrigger(result);
        return result;
    }

    if (typeof res.data === 'string' && res.data.indexOf('/entrance/page/noservice') !== -1) {
        // 非服務地區
        result.status = 'N';
        result.type = 2;
        result.message = 'serve error';
        result.apiResponseData = res;
        location.href = '/entrance/page/noservice';
        return result;
    }

    if (res.code === 'ECONNABORTED') {
        // axios 超時
        result.status = 'N';
        result.type = 3;
        result.message = 'timeout';
        result.apiResponseData = res;
        alertTrigger(result);
        return result;
    }

    if (res.status !== 200) {
        // network error
        result.status = 'N';
        result.type = 4;
        result.message = 'network fail';
        result.apiResponseData = res;

        window.dataLayer.push({
            event: 'failed_log',
            log: JSON.stringify(result),
            eventCallback: () => {
                if (res.message === 'Network Error') return result;

                alertTrigger(result);
                return result;
            }
        });
    }

    if (res.data.status !== 'Y') {
        // api error
        result.status = 'N';
        result.type = 5;
        result.message = res.data.message || 'api error';
        result.apiResponseData = res;
        alertTrigger(result);
        return result;
    }

    return result;
};


export { ajaxMiddleware as default };
export { ajaxMiddleware };
