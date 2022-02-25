import React from "react";
import { IContractData } from "../interfaces";

const contractData: IContractData = {
    totalSupply: null,
    setTotalSupply: () => {},
    mintPrice: null,
    setMintPrice: () => {}
};

const ContractContext = React.createContext({...contractData});

export {
    ContractContext,
    contractData
};