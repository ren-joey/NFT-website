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
    signingMessage: '你已準備好 召喚MINT β星人嗎？請先閱讀以下幾點說明\n\n1.召喚MINT 除了需要 0.1ETH 外，還需要額外給礦工的交易手續費 ( GAS FEE 瓦斯費 )\n2.不管有無成功買到都需支付這筆費用，因此沒搶到需自行承擔 GAS FEE\n3.GAS FEE 為浮動值，如您交易過程看到過高的費用可取消嘗試重新交易\n4.如看到高達 4ETH 的 GAS FEE，一率為合約錯誤；請勿當成 GAS FEE ，也不要確認交易\n\nβ星球期待你的到來。',
    metadataBaseUrl: 'https://0h72z1f6z5zv.usemoralis.com/',
    imageUrl: 'https://d2lle8dgtqcwbk.cloudfront.net'
};

export default moralisConfig;