import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import SocialButton from '../Shared/SocialButton';
import { LangString } from 'src/lang';
import { useContext } from 'react';
import { RwdContext } from 'src/Context/RwdContext';

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
                <div className="title-img">
                    <div className="star"></div>
                </div>
            </div>

            { getLine() }

            <div className="link-area">
                <SocialButton className='twitter mt-0' name='Twitter' />

                <div className="phone-line"></div>

                <SocialButton className='discord mt-0' name='Discord' />
            </div>

            { getLine() }

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