import moralisConfig from "./moralisConfig";
import { MoralisProvider } from "react-moralis";
import Web3ContractService from "./Web3ContractService";
import UserBalance from "./UserService/UserBalance";

const web3Style: React.CSSProperties = {color: '#fff'};

const Web3Component = () => (
    <MoralisProvider
        appId={moralisConfig.appId}
        serverUrl={moralisConfig.serverUrl}
    >
        <div style={web3Style}>
            <UserBalance />

            <Web3ContractService />
        </div>
    </MoralisProvider>
);

export default Web3Component;