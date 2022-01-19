import { useContext } from 'react';
import 'src/components/Footer.scss'
import { langContext } from 'src/Context/LangContext';

const Footer = () => {
    const lang = useContext(langContext);
    return (
        <div className="footer">
            <div className="gradient"></div>
            <div className="star"></div>
            <div className="to-be-continue"></div>
            <div className="earth"></div>
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
        </div>
    );
}

export default Footer;