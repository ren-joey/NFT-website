// TODO: https://docs.walletconnect.com/quick-start/dapps/web3-provider

import WalletConnectProvider from '@walletconnect/web3-provider';
import { useMoralis } from 'react-moralis';

const WalletConnection = () => {
    const {
        authenticate
    } = useMoralis();

    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
        infuraId: '27e484dcd9e3efcfd25a83a78777cdf1'
    });

    const fetch = () => {
        authenticate({
            provider: 'walletconnect'
        });
    };

    return (
        <div>
            <button onClick={() => provider.enable()}>native walletconnect</button>
            <button onClick={() => fetch()}>moralis walletconnect</button>
        </div>
    );
};

export default WalletConnection;