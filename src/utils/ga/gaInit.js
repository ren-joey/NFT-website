import store from '@/store';
import { gtmEventLog } from '../ajax/gtmEventLog';
import { gtmSender } from './gtmSender';
import { gaSender } from './gaSender';

const gaInit = () => {
    const { ga } = window;
    const { PublishConfig, InitData, UserInfo } = store.state;

    /**
     * 須確認每次的 GA ID
     * 發送相關 GA 參數
     * dimension1: 活動名稱
     * dimension2: 環境變數 (後置碼)
     * dimension3: Hall id
     * dimension4: 網站名稱@後置碼
     * dimension5: 後置碼
     */
    ga('create', PublishConfig.ga, 'auto');
    ga('set', 'location', location.href);
    ga('set', 'dimension1', InitData.event.name);
    ga('set', 'dimension2', InitData.alias);
    ga('set', 'dimension3', InitData.hallId);
    ga('set', 'dimension4', `${InitData.alias}@${InitData.unicode}`);
    ga('set', 'dimension5', InitData.unicode);
    ga('set', 'dimension6', `${UserInfo.username}@${InitData.unicode}`);
    ga('send', 'pageview');

    gaSender({ InitData, event: '網頁讀取_完畢_讀取' });
    gtmSender({ event: 'page_view' });
    gtmSender({ action: '_0_進入活動頁' });
    gtmEventLog({ action: '_0_進入活動頁' });
};

export { gaInit as default };
export { gaInit };
