import store from '@/store';

/**
 * GTM 發送器
 * gtmSender({ action: '_0_進入活動頁' });
 * gtmSender({ action: '_1_一鍵領獎彈窗', limit: {Number} });
 * gtmSender({ action: '_1_1_一鍵領獎_取消', limit: {Number} });
 * gtmSender({ action: '_1_2_一鍵領獎_開獎', limit: {Number} });
 * gtmSender({ action: '_2_點擊領獎按鈕', limit: {Number} });
 * gtmSender({ action: '_2_1_確認領獎_取消', limit: {Number} });
 * gtmSender({ action: '_2_2_確認領獎_開獎', limit: {Number} });
 * gtmSender({ action: '_2_2_1_獲得獎金', limit: {Number}, reward: {Number} });
 * gtmSender({ action: '活動名稱_2_2_2_動畫獎金', limit: {Number}, reward: {Number}, render_award: {Number} });
 * gtmSender({ action: '_3_點擊活動說明' });
 * gtmSender({ action: '_3_1_瀏覽活動說明' });
 * gtmSender({ action: '_3_2_關閉活動說明' });
 * gtmSender({ action: '_4_點擊領獎紀錄' });
 * gtmSender({ action: '_4_2_領獎紀錄上/下頁' });
 * gtmSender({ action: '_4_3_關閉領獎紀錄' });
 * gtmSender({ action: '_5_點擊活動遊戲' });
 * gtmSender({ action: '_5_1_點擊遊戲清單' });
 * gtmSender({ action: '_5_2_關閉遊戲清單' });
 * gtmSender({ action: '-LOG', error: {Number} });
 * @param {Object} param0
 * @param {String} param0.action - 事件內容
 * @param {Number} [param0.limit=null] - (選填)門檻數值
 * @param {Number} [param0.render_award=null] - (選填)開獎動畫畫面數值
 * @param {Number} [param0.award=null] - (選填)實際獲得獎金
 * @param {Number} [param0.error=null] - (選田)錯誤代碼
 */
const gtmSender = ({
    event,
    action = '',
    limit,
    render_award,
    award,
    error,
    memo = ''
} = {}) => {
    const { dataLayer } = window;
    const { InitData, UserInfo, utmSource, UUID, EventKey } = store.state;

    const apiInfo = {
        event: 'log',
        uuid: UUID,
        event_key: EventKey,
        action: `未知${action}`,
        unicode: '未知',
        user: '未知@未知',
        cumulative_valid: 0,
        limit: null,
        render_award: null,
        award: null,
        device: (window.innerWidth >= 992) ? 'PC' : 'PHONE',
        error: null,
        source: utmSource ? `utm_source=${utmSource}` : null,
        memo
    };

    if (event) apiInfo.event = event;
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
        if (limit !== undefined) apiInfo.limit = limit;
        if (render_award !== undefined) apiInfo.render_award = render_award;
        if (award !== undefined) apiInfo.award = award;
        if (error !== undefined) apiInfo.error = error;
    }

    if (InitData.isDev === 'Y') {
        console.log('GTM_SENDER:');
        console.log(apiInfo);
    }

    dataLayer.push(apiInfo);
};

export { gtmSender as default };
export { gtmSender };
