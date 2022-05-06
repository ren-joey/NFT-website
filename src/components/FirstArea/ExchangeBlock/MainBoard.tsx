import NftList from "./NftList";
import Planet from "./Planet";
import 'src/components/FirstArea/ExchangeBlock/MainBoard.scss' ;

const MainBoard = () => (
    <div className="main-board">
        <NftList />
        <Planet />
    </div>
);

export default MainBoard;