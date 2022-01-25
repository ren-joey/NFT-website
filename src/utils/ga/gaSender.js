import store from '@/store';
import config from './gaConfig';

const gaSender = ({
    initData,
    event,
    category = '',
    key
}) => {
    const { ga } = window;
    const { InitData, IsNews } = store.state;
    const _initData = { ...InitData, ...initData };

    if (category.length > 0) {
        if (key) ga('send', 'event', category, config[key]);
        else ga('send', 'event', category, event);
        return;
    }
    const eventStatus = (IsNews === 'Y') ? '體驗頁' : (_initData.event.status === 'running') ? '活動頁面' : '活動預告';
    const device = (_initData.appWrap.status === 'Y' || _initData.isAio === 'Y') ? 'AIO' : (_initData.device === 'desktop') ? 'PC' : 'mobile';

    if (key) ga('send', 'event', `${_initData.event.name}_zh_cn`, `${device}_${eventStatus}_${config[key]}`, `${_initData.alias}_${_initData.unicode}`);
    else ga('send', 'event', `${_initData.event.name}_zh_cn`, `${device}_${eventStatus}_${event}`, `${_initData.alias}_${_initData.unicode}`);
};

export { gaSender as default };
export { gaSender };
