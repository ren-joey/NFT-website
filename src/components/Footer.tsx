import { useContext } from "react";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";

const Footer = () => {
    const lang = useContext(LangContext);
    const { device } = useContext(EventContext);

    return (
        <div className="footer">
            <div className="gradient"></div>
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
            { device === 'desktop' && (
                <div className="earth" style={
                    { backgroundImage: `url(${getResources('earth')})` }
                }></div>
            )}
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
        </div>
    );
};

export default Footer;