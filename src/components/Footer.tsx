import { useContext } from 'react';
import 'src/components/Footer.scss';
import { LangContext } from 'src/Context/LangContext';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';

const Footer = () => {
    const {device} = useContext(EventContext);
    const lang = useContext(LangContext);

    return (
        <div className="footer">
            {
                device === 'desktop' &&
                    <div
                        id="lineTurningSkew"
                        className="line-turning-skew"
                        style={
                            { backgroundImage: `url(${getResources('line_turning_skew')})` }
                        }
                    ></div>
            }

            { device === 'phone' && <div className="phone-line"></div> }
            <div className="gradient"></div>
            <div className="star" style={
                { backgroundImage: `url(${getResources('glowing_star')})` }
            }></div>
            <div className="to-be-continue" style={
                { backgroundImage: `url(${getResources('to_be_continue')})` }
            }></div>
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