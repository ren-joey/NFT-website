export type chainList =
    "eth"
    | "0x1"
    | "ropsten"
    | "0x3"
    | "rinkeby"
    | "0x4"
    | "goerli"
    | "0x5"
    | "kovan"
    | "0x2a"
    | "polygon"
    | "0x89"
    | "mumbai"
    | "0x13881"
    | "bsc"
    | "0x38"
    | "bsc testnet"
    | "0x61"
    | "avalanche"
    | "0xa86a"
    | "avalanche testnet"
    | "0xa869"
    | "fantom"
    | "0xfa";

const moralisConfig = {
    serverUrl: 'https://0h72z1f6z5zv.usemoralis.com:2053/server',
    appId: 'U6GvcTlZ2aD8hF0CD967tsAA9AAFKS25H0NPXCJ0',
    contractAddress: '0x67f89F08430C842658F09dc446583e70AA2aa392', // 第二次 CB
    // contractAddress: '0x68781cE693c9A3fe78b0eDfdA8BD7854AEe78b8c', // 個人測試，有 burn
    // contractAddress: '0x9F3f5AAB9C18B60BC18C774E90DAb3Af3c8D381d', // 第一次 CB
    // contractAddress: '0xa388582a7b12094414f625951f5efe25f127ab93',
    // contractAddress: '0x6ae4304a7aF24EB71173331FA7b25E95F99D2Bß07',
    ownerAddress: '0x4Cc93Ece5cA1240a1C993e1e111F1358E386A4d0',
    provider: 'rinkeby',
    chainId: 4,
    metadataBaseUrl: 'https://0h72z1f6z5zv.usemoralis.com/',
    imageUrl: 'https://d2lle8dgtqcwbk.cloudfront.net'
};

export default moralisConfig;