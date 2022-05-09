import { useContext, useEffect } from "react";
import { StableNftMembers, StableNftOption } from "src/@types/nft";
import { ContractContext } from "src/Context/ContractContext";
import { LangContext } from "src/Context/LangContext";

const NftStableBalance = ({
    stableNfts,
    setStableNfts
}: Omit<
    StableNftMembers,
    'selectedNftAmount'
>) => {
    const lang = useContext(LangContext);
    const { nfts } = useContext(ContractContext);

    useEffect(() => {
        const nfts_: StableNftOption[] = nfts.reduce<StableNftOption[]>((resArr, nft) => {
            if (nft.metadata
                && nft.owner_of
                && typeof nft.metadata !== 'string') {
                resArr.push({
                    select: false,
                    token_id: nft.token_id,
                    metadata: nft.metadata,
                    owner_of: nft.owner_of
                });
            }
            return resArr;
        }, []);
        setStableNfts(nfts_);
    }, [nfts]);

    const selectNft = (idx: number) => {
        const cloneArr = [...stableNfts];
        cloneArr[idx].select = !(cloneArr[idx].select);
        setStableNfts(cloneArr);
    };

    return (
        <div className="nft-list-container">
            {
                stableNfts.length === 0
                    ? <div className="nft-card">
                        <div className="empty-card"></div>
                        <div className="nft-name">
                            { lang.ZERO_BALANCE }
                        </div>
                    </div>
                    : stableNfts.map((nft, idx) => nft.metadata && (
                        typeof nft.metadata !== 'string' && (
                            <div
                                className="nft-card"
                                key={nft.metadata.name}
                            >
                                <div
                                    className={`card-pointer-area ${nft.select ? 'selected' : ''}`}
                                    onClick={() => selectNft(idx)}
                                ></div>
                                <img src={nft.metadata.image} alt={nft.metadata.description}></img>
                                <div className="nft-name">
                                    {nft.metadata.name}
                                </div>
                            </div>
                        )
                    ))
            }
        </div>
    );
};

export default NftStableBalance;