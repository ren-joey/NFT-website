import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import SocialButton from '../Shared/SocialButton';
import { useContext } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';
import { socialList } from 'src/socialMediaConfig';
import RoadmapSocialCard from './RoadmapSocialCard';
import { LangString } from 'src/@types/basicVariable';

interface Props {
    selectedLang: LangString
}

const Roadmap = ({ selectedLang }: Props) => {
    const { device } = useContext(EventContext);

    const getLine = () => {
        if (device === 'phone') return <div className="phone-line"></div>;
        return '';
    };

    return(
        <div className={`roadmap ${selectedLang === 'EN' ? 'en' : ''}`}>
            <div className="desc-area">
                { device === 'desktop' && (
                    <div className="guide-line">
                        <div id="roadmapLine" className="line"></div>
                    </div>
                )}
                <div className="title-img" style={
                    { backgroundImage: `url(${getResources('roadmap')})` }
                }>
                    <div className="star" style={
                        { backgroundImage: `url(${getResources('glowing_star')})` }
                    }></div>
                </div>
            </div>

            {/* { getLine() } */}

            <RoadmapSocialCard idx={1} className="text-stroke" />

            { getLine() }

            <div className="link-area">
                {
                    socialList.map((social, idx) => (
                        social.visible &&
                            <div key={idx}>
                                <SocialButton
                                    className={`${social.iconName} mt-0`}
                                    name={social.title}
                                    iconName={social.iconName}
                                    href={social.href}
                                />
                                { getLine() }
                            </div>
                    ))
                }
            </div>

            <RoadmapCard idx={2} className="text-stroke" />

            { getLine() }

            <RoadmapCard idx={3} />

            { getLine() }

            <RoadmapCard idx={4} />

            { getLine() }

            <RoadmapCard idx={5} className="text-stroke" />

            { getLine() }

            <RoadmapCard idx={6} className="text-stroke" />

        </div>
    );
};

export default Roadmap;