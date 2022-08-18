import { EthConfig } from '../@types/nft';

const ethConfig: EthConfig = {
    version: '1.3.0',
    exchangeOpen: true,
    officialWebsiteUrl: 'https://www.vbc-labs.com/',
    serverUrl: 'https://0h72z1f6z5zv.usemoralis.com:2053/server',
    appId: 'U6GvcTlZ2aD8hF0CD967tsAA9AAFKS25H0NPXCJ0',

    // contractAddress: '0xC8d3eFDA9DC9912150e7d2AfE17587e566a0BdaE', // 正式鏈
    contractAddress: '0x6a4ac0445D5eb5228A5C68CA8A3d475Dcd9D02c4', // 0330_CB3 [DEV]
    // contractAddress: '0x67f89F08430C842658F09dc446583e70AA2aa392', // CB2
    // contractAddress: '0x68781cE693c9A3fe78b0eDfdA8BD7854AEe78b8c', // 個人測試，有 burn
    // contractAddress: '0x2DAF1C98AB11d2756eBFf49435f4Af21EdcecD71', // 個人測試，有 burn，MAX_SUPPLY 10
    // contractAddress: '0x9F3f5AAB9C18B60BC18C774E90DAb3Af3c8D381d', // CB1
    // contractAddress: '0xa388582a7b12094414f625951f5efe25f127ab93',
    // contractAddress: '0x6ae4304a7aF24EB71173331FA7b25E95F99D2Bß07',

    // ownerAddress: '0xe9D837b4F7A3C37794738fa682a928A9cfBF623A', // 主錢包
    // ownerAddress: '0x03799820935f0FF5c0CE8ceBd82DB49b4053e4E8', // 主錢包(已廢棄)
    ownerAddress: '0x4Cc93Ece5cA1240a1C993e1e111F1358E386A4d0', // account 1 [DEV]
    // ownerAddress: '0x23AdF1409c5b2436978BF21d9AB36BCb918F2607', // account 3 [DEV]

    nftExchangeOfficialAddress: '0x178cE27bBB6FDBbA1717CD60A5D7CaF2B984D9bF',

    nftExchangeApiServer: 'https://www.vbc-labs.com',

    // provider: 'eth',
    provider: 'rinkeby', // [DEV]

    // chainId: 1,
    chainId: 4, // [DEV]

    // etherscanUrl: 'https://etherscan.io/tx/',
    etherscanUrl: 'https://rinkeby.etherscan.io/tx/', // [DEV]

    metadataBaseUrl: 'https://d1gcra2b3uvkgc.cloudfront.net/',
    // metadataBaseUrl: 'https://0h72z1f6z5zv.usemoralis.com/', // legacy
    imageUrl: 'https://d2lle8dgtqcwbk.cloudfront.net',

    authConfig: {}
    // authConfig: deviceDetector.device?.type === 'desktop'
    //     ? {}
    //     : {
    //         provider: 'walletconnect'
    //     }
};

export default ethConfig;