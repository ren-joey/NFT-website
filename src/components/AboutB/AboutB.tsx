import { useContext } from 'react';
import 'src/components/AboutB/AboutB.scss'
import { langContext } from 'src/Context/LangContext';
import BAlienSlider from './BAlienSlider';
import FeatureCard from './FeatureCard';

const AboutB = () => {
    const lang = useContext(langContext);
    return (
        <div className="about-b">
            <div className="desc-area">
                <div className="guide-line">
                    <div className="line">
                        <div className="skull"></div>
                        <div className="star"></div>
                    </div>
                </div>
                <div className="content">
                    <div className="title-img"></div>
                    <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC}}></div>
                </div>
            </div>

            <div className="feature-card-area">
                <div className="feature-card-row">

                    <FeatureCard idx={1} />
                    <FeatureCard idx={2} />
                    <FeatureCard idx={3} />

                </div>
                <div className="feature-card-row">
                    <div className="aside"></div>

                    <FeatureCard idx={4} />
                    <FeatureCard idx={5} />

                    <div className="aside">
                        <BAlienSlider />

                        {/* <div className="line-right-bottom"></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutB;