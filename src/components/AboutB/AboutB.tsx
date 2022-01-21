import { useContext } from 'react';
import 'src/components/AboutB/AboutB.scss';
import { LangContext } from 'src/Context/LangContext';
import BAlienSlider from './BAlienSlider';
import FeatureCard from './FeatureCard';

const AboutB = () => {
    const lang = useContext(LangContext);

    return (
        <div className="about-b">
            <div className="desc-area">
                <div className="guide-line pc">
                    <div className="line">
                        <div className="skull"></div>
                        <div className="star"></div>
                    </div>
                </div>
                <div className="content">
                    <div className="title-img"></div>
                    <div className="desc pc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC_PC}}></div>
                    <div className="desc phone" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC}}></div>
                </div>
            </div>

            <div className="feature-card-area">
                <div className="feature-card-row">

                    <FeatureCard idx={1} />
                    <FeatureCard idx={2} />
                    <FeatureCard idx={3} line={false}/>

                    <div className="line-turning-around"></div>
                </div>
                <div className="feature-card-row">
                    <div className="aside"></div>
                    <div className="line-turning-left"></div>

                    <FeatureCard idx={5} />
                    <FeatureCard idx={4} line={false} />

                    <div className="aside">
                        <BAlienSlider />
                    </div>
                </div>
            </div>

            <div className="feature-card-area phone">
                <div className="feature-card-row">
                    <div className="feature-card-col space-left">
                        <FeatureCard idx={1} />
                        <FeatureCard idx={3} />
                        <FeatureCard idx={5} />
                    </div>
                    <div className="feature-card-col space-right">
                        <FeatureCard idx={2} />
                        <FeatureCard idx={4} />
                    </div>
                </div>

                <BAlienSlider />
            </div>
        </div>
    );
};

export default AboutB;