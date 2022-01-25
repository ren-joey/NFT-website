import axios from 'axios';
import store from '@/store';

const eventBucket = async (settings) => {
    const { InitData, UserInfo, EventKey, utmSource, UUID } = store.state;

    let apiInfo = {
        Platform: (window.innerWidth >= 992) ? 'PC' : 'PHONE',
        UserID: '未知@未知'
    };
    if (InitData.eventId !== undefined) {
        apiInfo = {
            UserID: UserInfo.username && InitData.unicode
                ? `${UserInfo.username}@${InitData.unicode}`
                : InitData.unicode
                    ? `未登入@${InitData.unicode}`
                    : '未知@未知',
            Platform: InitData.appWrap.status === 'Y'
                ? 'AIO'
                : (InitData.device === 'desktop')
                    ? 'PC' : 'PHONE',
            EventKey: InitData.isDev === 'Y' ? `dev/${EventKey}` : EventKey,
            Amount: InitData.isLogin === 'Y' ? UserInfo.cumulativeValid : 0
        };
    }

    const obj = {
        method: 'post',
        url: 'https://api.bbin-sk.com/api/log/',
        params: {
            UUID,
            ...apiInfo,
            ...settings,
            Memo: `utm_source=${utmSource}`
        }
    };
    if (InitData.isDev === 'Y') {
        console.log({
            UUID,
            ...apiInfo,
            ...settings,
            Memo: `utm_source=${utmSource}`
        });
    }


    return axios(obj);
};

export { eventBucket as default };
export { eventBucket };
