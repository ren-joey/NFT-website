import { useContext } from "react";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import moralisConfig from "src/moralisConfig";

const Footer = () => {
    const lang = useContext(LangContext);
    const { device } = useContext(EventContext);

    return (
        <div className="footer">
            <div className="gradient"></div>
            <div className="copyright">
                {lang.COPYRIGHT}
                <br />
                <small>v{moralisConfig.version}</small>
            </div>
            { device === 'desktop' && (
                <div className="earth" style={
                    { backgroundImage: `url(${getResources('earth')})` }
                }></div>
            )}
        </div>
    );
};

export default Footer;