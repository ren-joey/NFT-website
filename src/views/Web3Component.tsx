import moralisConfig from "./moralisConfig";
import { MoralisProvider } from "react-moralis";
import Web3LoginService from "./Web3LoginService";
import Web3ContractService from "./Web3ContractService";


const Web3Component = () => (
    <MoralisProvider
        appId={moralisConfig.appId}
        serverUrl={moralisConfig.serverUrl}
    >
        <div>
            <Web3LoginService />

            <Web3ContractService />
        </div>
    </MoralisProvider>
);

export default Web3Component;