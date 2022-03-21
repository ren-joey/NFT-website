interface IErrorMsgObj {
    message: string,
    [key: string]: any
}

const regex = /Not in( vip)? white list/g;

const mintErrorHandler = ({ message }: IErrorMsgObj) => {
    if (message.includes('Sale must be active to mint Betamon')) {
        alert('MINT 尚未開放，敬請期待。');
    } else if (message.includes('Sale would exceed max supply')) {
        alert('VBC Betamon 已經 MINT 一空，感謝支持。');
    } else if (message.includes('Sale would exceed max balance')
        || message.includes('Sale would exceed max mint')) {
        alert('每個錢包持有 3 個NFT就無法再 召喚MINT β星人，請確認您持有的數量');
    } else if (message.includes('Not enough ether sent')) {
        alert('您的以太幣不足。');
    } else if (regex.test(message)) {
        alert('很抱歉，你並非這階段可召喚 MINT 的人類白名單');
    }
};

export default mintErrorHandler;