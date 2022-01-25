import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss';
import SocialButton from '../Shared/SocialButton';

const Roadmap = () => (
    <div className="roadmap">
        <div className="desc-area">
            <div className="guide-line">
                <div id="roadmapLine" className="line"></div>
            </div>
            <div className="title-img">
                <div className="star"></div>
            </div>
        </div>

        <div className="phone-line"></div>

        <RoadmapCard idx={1} />

        <div className="phone-line"></div>

        <div className="link-area">
            <SocialButton className='twitter mt-0' name='Twitter' />

            <div className="phone-line"></div>

            <SocialButton className='discord mt-0' name='Discord' />
        </div>

        <div className="phone-line"></div>

        <RoadmapCard idx={2} />

        <div className="phone-line"></div>

        <RoadmapCard idx={3} />

        <div className="phone-line"></div>

        <RoadmapCard idx={4} />

        <div className="phone-line"></div>

        <RoadmapCard idx={5} />

    </div>
);

export default Roadmap;