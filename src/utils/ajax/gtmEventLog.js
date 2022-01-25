import axios from 'axios';
import store from '@/store';

/**
 * GTM 發送器
 * gtmEventLog({ action: '_0_進入活動頁' });
 * gtmEventLog({ action: '_1_一鍵領獎彈窗', limit: {Number} });
 * gtmEventLog({ action: '_1_1_一鍵領獎_取消', limit: {Number} });
 * gtmEventLog({ action: '_1_2_一鍵領獎_開獎', limit: {Number} });
 * gtmEventLog({ action: '_2_點擊領獎按鈕', limit: {Number} });
 * gtmEventLog({ action: '_2_1_確認領獎_取消', limit: {Number} });
 * gtmEventLog({ action: '_2_2_確認領獎_開獎', limit: {Number} });
 * gtmEventLog({ action: '_2_2_1_獲得獎金', limit: {Number}, reward: {Number} });
 * gtmEventLog({ action: '活動名稱_2_2_2_動畫獎金', limit: {Number}, reward: {Number}, render_award: {Number} });
 * gtmEventLog({ action: '_3_點擊活動說明' });
 * gtmEventLog({ action: '_3_1_瀏覽活動說明' });
 * gtmEventLog({ action: '_3_2_關閉活動說明' });
 * gtmEventLog({ action: '_4_點擊領獎紀錄' });
 * gtmEventLog({ action: '_4_2_領獎紀錄上/下頁' });
 * gtmEventLog({ action: '_4_3_關閉領獎紀錄' });
 * gtmEventLog({ action: '_5_點擊活動遊戲' });
 * gtmEventLog({ action: '_5_1_活動遊戲展開' });
 * gtmEventLog({ action: '_5_2_關閉遊戲清單' });
 * gtmEventLog({ action: '-LOG', error: {Number} });
 * @param {Object} param0
 * @param {String} param0.action - 事件內容
 * @param {Number} [param0.limit=null] - (選填)門檻數值
 * @param {Number} [param0.render_award=null] - (選填)開獎動畫畫面數值
 * @param {Number} [param0.award=null] - (選填)實際獲得獎金
 * @param {Number} [param0.error=null] - (選田)錯誤代碼
 */
const gtmEventLog = async ({
    action = '',
    limit,
    render_award,
    award,
    error,
    memo = ''
} = {}) => {
    const { InitData, UserInfo, utmSource, EventKey, UUID } = store.state;

    const apiInfo = {
        uuid: UUID,
        event_key: EventKey,
        action: `未知${action}`,
        unicode: '未知',
        user: '未知@未知',
        cumulative_valid: 0,
        bet_limit: null,
        render_award: null,
        award: null,
        device: (window.innerWidth >= 992) ? 'PC' : 'PHONE',
        error: null,
        source: utmSource ? `utm_source=${utmSource}` : null,
        memo
    };

    if (InitData !== undefined) {
        apiInfo.action = InitData.event.name + action;
        if (InitData.isLogin === 'Y') {
            apiInfo.user = `${UserInfo.username}@${InitData.unicode}`;
            apiInfo.cumulative_valid = UserInfo.cumulativeValid;
        } else {
            apiInfo.user = `未知@${InitData.unicode}`;
        }

        if (InitData.unicode !== undefined) apiInfo.unicode = InitData.unicode;
        if (InitData.appWrap !== undefined
            && InitData.appWrap.status !== undefined) {
            apiInfo.device = InitData.appWrap.status === 'Y'
                ? 'AIO'
                : InitData.device;
        }
        if (limit) apiInfo.bet_limit = limit;
        if (render_award) apiInfo.render_award = render_award;
        if (award) apiInfo.award = award;
        if (error) apiInfo.error = error;
    }

    if (InitData.isDev === 'Y') {
        console.log('GTM_LOG:');
        console.log(apiInfo);
    }

    const obj = {
        method: 'post',
        url: 'https://api.bbin-sk.com/api/gtm-log/',
        params: apiInfo
    };

    return axios(obj);
};

export { gtmEventLog as default };
export { gtmEventLog };
