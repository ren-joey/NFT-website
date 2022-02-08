import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import SocialButton from '../Shared/SocialButton';
import { LangString } from 'src/lang';
import { useContext } from 'react';
import { RwdContext } from 'src/Context/RwdContext';
import { getResources } from 'src/functions/loader';
import { socialList } from 'src/socialMediaConfig';

interface IRoadmap {
    selectedLang: LangString
}

const Roadmap = ({ selectedLang }: IRoadmap) => {
    const { device } = useContext(RwdContext);

    const getLine = () => {
        if (device === 'phone') return <div className="phone-line"></div>;
        return '';
    };

    return(
        <div className={`roadmap ${selectedLang === 'EN' ? 'en' : ''}`}>
            <div className="desc-area">
                <div className="guide-line">
                    <div id="roadmapLine" className="line"></div>
                </div>
                <div className="title-img" style={
                    { backgroundImage: `url(${getResources('roadmap')})` }
                }>
                    <div className="star" style={
                        { backgroundImage: `url(${getResources('glowing_star')})` }
                    }></div>
                </div>
            </div>

            { getLine() }

            <RoadmapCard idx={1} />

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
                                />
                                { getLine() }
                            </div>
                    ))
                }
            </div>

            <RoadmapCard idx={2} />

            { getLine() }

            <RoadmapCard idx={3} />

            { getLine() }

            <RoadmapCard idx={4} />

            { getLine() }

            <RoadmapCard idx={5} />

        </div>
    );
};

export default Roadmap;