import 'src/components/VbcLabs/SlashesDivider.scss';
import { getResources } from 'src/functions/loader';

interface IProps {
    content: string
}

const SlashesDivider = ({ content }: IProps) => (
    <div className="slashes-divider-wrapper">
        <div className="slashes-divider" style={
            { backgroundImage: `url(${getResources('slashes_divider')})` }
        }>
            <div className="content" dangerouslySetInnerHTML={{
                __html: content
            }}></div>
        </div>
    </div>
);

export default SlashesDivider;