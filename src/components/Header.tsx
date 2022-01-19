import 'src/components/Header.scss'

const Header = () => (
    <div className="header">
        <div className="header-container">
            <div className="logo"></div>
            <div className="nav-area">
                <div className="nav">
                    <div className="icon opensea"></div>
                    <div className="nav-text">OPENSEA</div>
                </div>
                <div className="nav">
                    <div className="icon discord"></div>
                    <div className="nav-text">DISCORD</div>
                </div>
                <div className="nav">
                    <div className="icon twitter"></div>
                    <div className="nav-text">TWITTER</div>
                </div>
                <div className="nav">
                    <div className="icon roadmap-icon"></div>
                    <div className="nav-text">ROADMAP</div>
                </div>
            </div>
            <div className="lang-area">
                <div className="lang-nav">简</div>
                <div className="lang-nav active">繁</div>
                <div className="lang-nav">EN</div>
            </div>
        </div>
    </div>
)

export default Header;