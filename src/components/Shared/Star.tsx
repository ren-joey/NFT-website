import 'src/components/Shared/Star.scss';
import { getResources } from 'src/functions/loader';

const Star = () => (
    <div className="star-icon" style={
        { backgroundImage: `url(${getResources('glowing_star')})` }
    }></div>
);

export default Star;