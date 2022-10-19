import Web3 from 'web3';

const getEncodeFunctionSignature = (functionString: string) => {
    const { ethereum } = window;
    const web3 = new Web3(ethereum);

    return web3.eth.abi.encodeFunctionSignature(functionString);
};

export default getEncodeFunctionSignature;