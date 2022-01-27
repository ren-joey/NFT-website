import { useContext } from 'react';
import 'src/components/Footer.scss';
import { LangContext } from 'src/Context/LangContext';
import { RwdContext } from 'src/Context/RwdContext';

const Footer = () => {
    const {device} = useContext(RwdContext);
    const lang = useContext(LangContext);

    return (
        <div className="footer">
            {
                device === 'desktop'
                    ? <div id="lineTurningSkew" className="line-turning-skew"></div>
                    : ''
            }

            { device === 'phone' ? <div className="phone-line"></div> : ''}
            <div className="gradient"></div>
            <div className="star"></div>
            <div className="to-be-continue"></div>
            <div className="earth"></div>
            <div className="copyright">
                {lang.COPYRIGHT}
            </div>
        </div>
    );
};

export default Footer;