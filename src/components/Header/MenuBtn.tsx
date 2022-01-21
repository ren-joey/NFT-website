import 'src/components/Header/MenuBtn.scss';

interface IMenuBtn {
    active: boolean
    onClick: () => void
}

const MenuBtn = ({ active, onClick }: IMenuBtn) => (
    <div
        onClick={() => onClick()}
        className={`menu-icon phone ${active ? 'active' : ''}`}
    >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>
);

export default MenuBtn;
