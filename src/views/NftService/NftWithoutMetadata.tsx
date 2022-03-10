import { blackDescription, blackTitle, whiteCard } from "src/components/ui/uiClassName";
import { INft } from "../interfaces";

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
        <p className="text-xs text-gray-400">
            ID: {nft.token_id}
        </p>
    </div>
);

export default NftWithoutMetadata;