import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import { useContext } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';
import { socialList } from 'src/configs/socialMediaConfig';
import RoadmapSocialCard from './RoadmapSocialCard';
import { LangString } from 'src/@types/basicVariable';
import SocialButton from '../Shared/Buttons/SocialButton';
import RoadmapEventCard from './RoadmapEventCard';
import { LangContext } from 'src/Context/LangContext';

interface Props {
    selectedLang: LangString
}

const Roadmap = ({ selectedLang }: Props) => {
    const lang = useContext(LangContext);
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
                        <div
                            id="roadmapLine"
                            className="line"
                        >
                        </div>
                    </div>
                )}
                <div
                    className="title-img"
                    style={
                        { backgroundImage: `url(${getResources('roadmap')})` }
                    }
                >
                    <div
                        className="star"
                        style={
                            { backgroundImage: `url(${getResources('glowing_star')})` }
                        }
                    >
                    </div>
                </div>
            </div>

            <RoadmapCard
                idx={6}
                className="text-stroke"
            />
            { getLine() }

            <RoadmapCard
                idx={5}
                className="text-stroke"
            />
            { getLine() }

            <RoadmapEventCard
                idx={4}
                className="text-stroke"
            />
            { getLine() }

            <div className="link-area">
                <SocialButton
                    className={`${socialList[5].title}-1 mt-0`}
                    name={lang.PROMOTION_1}
                    iconName={socialList[5].iconName}
                    href={socialList[5].href}
                />
                { getLine() }

                <SocialButton
                    className={`${socialList[6].title}-2 mt-0`}
                    name={lang.PROMOTION_2}
                    iconName={socialList[6].iconName}
                    href={socialList[6].href}
                />
                { getLine() }
            </div>

            <RoadmapCard
                idx={3}
                className="text-stroke"
            />
            { getLine() }

            <RoadmapCard
                idx={2}
                className="text-stroke"
            />
            { getLine() }

            <RoadmapSocialCard
                idx={1}
                className="text-stroke"
            />
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

        </div>
    );
};

export default Roadmap;