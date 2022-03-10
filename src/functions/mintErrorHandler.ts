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
        alert('每人最多持有 3 個 VBC Betamon，請重新確認您的 MINT 數量。');
    } else if (message.includes('Not enough ether sent')) {
        alert('您的以太幣不足。');
    } else if (regex.test(message)) {
        alert('很抱歉，您不符合白名單資格。');
    }
};

export default mintErrorHandler;