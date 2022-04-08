import { useContext } from 'react';
import 'src/components/AboutB/AboutB.scss';
import { LangContext } from 'src/Context/LangContext';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';
import Star from '../Shared/Star';
import BAlienSlider from './BAlienSlider';
import FeatureCard from './FeatureCard';
import { LangString } from 'src/@types/basicVariable';

interface IAboutB {
    selectedLang: LangString
}

const AboutB = ({ selectedLang }: IAboutB) => {
    const { device } = useContext(EventContext);
    const lang = useContext(LangContext);
    const skullIcon: React.CSSProperties = { backgroundImage: `url(${getResources('skull_icon')})` };

    return (
        <div className="about-b">
            <div className="desc-area">
                <div className="guide-line pc">
                    <div id="aboutBLine" className="line"></div>
                    <div className="skull" style={skullIcon}></div>
                    <div className="star-container">
                        <Star />
                    </div>
                </div>
                <div id="aboutBContent" className="content">
                    <div className="title-img" style={
                        {backgroundImage: `url(${getResources('about_b')})`}
                    }></div>
                    <div className="desc pc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC_PC}}></div>
                    <div className="desc phone" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC}}></div>
                </div>
            </div>

            {
                device === 'phone' &&
                    <div className="phone-skull" style={skullIcon}>
                        <div id="aboutBPhoneLine" className={`phone-line ${selectedLang === 'EN' && 'en'}`}></div>
                    </div>
            }

            {
                device === 'desktop' ?
                    <div className="feature-card-area">
                        <div id="featureCardRow1" className="feature-card-row">

                            <FeatureCard idx={1} selectedLang={selectedLang} />
                            <FeatureCard idx={2} selectedLang={selectedLang} />
                            <FeatureCard idx={3} line={false} selectedLang={selectedLang}/>

                            <div
                                id="lineTurningAround" className="line-turning-around"
                                style={
                                    { backgroundImage: `url(${getResources('line_turning_around')})` }
                                }
                            >
                                <div className="star-container">
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <div id="featureCardRow2" className="feature-card-row reverse">
                            <div className="aside">
                                <BAlienSlider />
                            </div>

                            <FeatureCard idx={4} line={false} selectedLang={selectedLang} />
                            <FeatureCard idx={5} selectedLang={selectedLang} />

                            <div className="aside"></div>
                            <div
                                id="lineTurningLeft"
                                className="line-turning-left"
                                style={
                                    { backgroundImage: `url(${getResources('line_turning_left')})` }
                                }
                            >
                                <div className="star-container" style={
                                    { backgroundImage: `url(${getResources('glowing_star')})` }
                                }></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="feature-card-area phone">
                        <div className="feature-card-row">
                            <div className="feature-card-col space-left">
                                <div id="featureCard1">
                                    <FeatureCard idx={1} selectedLang={selectedLang} />
                                </div>
                                <div id="featureCard3">
                                    <FeatureCard idx={3} selectedLang={selectedLang} />
                                </div>
                                <div id="featureCard5">
                                    <FeatureCard idx={5} selectedLang={selectedLang} />
                                </div>
                            </div>
                            <div className="feature-card-col space-right">
                                <div id="featureCard2">
                                    <FeatureCard idx={2} selectedLang={selectedLang} />
                                </div>
                                <div id="featureCard4">
                                    <FeatureCard idx={4} selectedLang={selectedLang} />
                                </div>
                            </div>
                        </div>

                        <BAlienSlider />
                    </div>
            }
        </div>
    );
};

export default AboutB;