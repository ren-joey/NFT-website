export type nullable = null|number;

export interface IContractData {
    totalSupply: nullable,
    setTotalSupply: (num: nullable) => void,
    mintPrice: nullable,
    setMintPrice: (num: nullable) => void
}