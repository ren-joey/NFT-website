import Web3 from "web3";

const transactionReceiptCheck = (address: string) => {
    const { ethereum } = window;
    const web3 = new Web3(ethereum);

    return web3.eth.getTransactionReceipt(address);
};

export default transactionReceiptCheck;