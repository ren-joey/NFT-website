import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";

const Footer = () => {
    const lang = useContext(LangContext);

    return (
        <div className="footer">
            <div className="gradient"></div>
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
            <div className="earth" style={
                { backgroundImage: `url(${getResources('earth')})` }
            }></div>
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
        </div>
    );
};

export default Footer;