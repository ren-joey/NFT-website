import { blackDescription, blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { INft } from "../interfaces";
import { refreshNft } from "./functions";

interface IProp {
    nft: INft
}

const NftWithoutMetadata = ({ nft }: IProp) => (
    <div className={`${whiteCard} flex-col`} style={{
        width: '300px'
    }}>
        <p className={blackTitle}>
            此 NFT METADATA 遺失<br />
            請聯繫 VBC 團隊取得協助<br />
        </p>
        <p className={blackDescription}>
            請放心，您的 NFT 已 mint 成功
        </p>
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

export default NftWithoutMetadata;