import RoadmapCard from './RoadmapCard';
import 'src/components/Roadmap/Roadmap.scss'

const Roadmap = () => (
    <div className="roadmap">
        <div className="desc-area">
            <div className="guide-line">
                {/* <div className="line">
                        <div className="star"></div>
                    </div> */}
            </div>
            <div className="title-img"></div>
        </div>

        <RoadmapCard idx={1} />
        <RoadmapCard idx={2} />
        <RoadmapCard idx={3} />
        <RoadmapCard idx={4} />
        <RoadmapCard idx={5} />
    </div>
)

export default Roadmap;