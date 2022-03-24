import { blackDescription, blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { INft } from "../interfaces";
import { refreshNft } from "./functions";

interface IProp {
    nft: INft
}

const NftWithMetadata = ({ nft }: IProp) => (
    <div className={`${whiteCard} flex-col`} style={{
        width: '300px'
    }}>
        <img width="300" height="300" src={nft.metadata.image} alt={nft.metadata.name} />
        <h3 className={`${blackTitle} mt-5`}>
            {nft.metadata.name}
        </h3>
        <div className={blackDescription}>
            {nft.metadata.description}
        </div>
        <div className="mt-2">
            <button
                className={cyanBtn}
                onClick={() => refreshNft(nft)}
            >
                Refresh Metadata
            </button>
        </div>
    </div>
);

export default NftWithMetadata;