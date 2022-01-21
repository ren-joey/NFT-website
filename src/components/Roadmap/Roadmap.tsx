import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import SocialButton from '../Shared/SocialButton';
import { useContext } from 'react';
import { RwdContext } from 'src/Context/RwdContext';

const Roadmap = () => {
    const {device} = useContext(RwdContext);

    return (
        <div className="roadmap">
            <div className="desc-area">
                <div className="guide-line">
                    {device === 'desktop'
                        ? (
                            <div className="line">
                                <div className="star"></div>
                            </div>
                        ) : ''}
                </div>
                <div className="title-img">
                    {device === 'desktop' ? <div className="star"></div> : ''}
                </div>
            </div>

            <RoadmapCard idx={1} />

            <div className="link-area">
                <SocialButton className='twitter' name='Twitter' />
                <SocialButton className='discord' name='Discord' />
            </div>

            <RoadmapCard idx={2} />
            <RoadmapCard idx={3} />
            <RoadmapCard idx={4} />
            <RoadmapCard idx={5} />
        </div>
    );
};

export default Roadmap;