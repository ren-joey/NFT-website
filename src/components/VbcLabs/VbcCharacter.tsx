import { useContext, useState } from 'react';
import 'src/components/VbcLabs/VbcCharacter.scss';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';

interface IProps {
    idx: number;
}

const VbcCharacter = ({ idx }: IProps) => {
    const lang = useContext(LangContext);
    const name = lang[`MEMBER_${idx}_NAME`];
    const [ hovered, setHovered ] = useState(false);
    const className = () => {
        if (idx <= 2) return 'vbc-text-bubble';
        return `vbc-text-bubble remainder-${idx % 3}`;
    };

    return (
        <div className={`vbc-character-wrapper ${hovered ? 'hovered' : ''}`}>
            <div
                className="vbc-character-container"
                onMouseEnter={() => { setHovered(true); }}
                onMouseLeave={() => { setHovered(false); }}
            >
                <div className="title-area">
                    <div className="job-title">
                        {lang[`MEMBER_${idx}_TITLE`]}
                    </div>
                    <div className="nickname">
                        {lang[`MEMBER_${idx}_NAME`]}
                    </div>
                </div>

                <div
                    className={className()}
                    style={
                        { backgroundImage: `url(${getResources('purple_text_bubble')})` }
                    }
                >
                    <div
                        className="text"
                        dangerouslySetInnerHTML={{__html: lang[`MEMBER_${idx}_DESC`]}}
                    >
                    </div>
                </div>

                <div
                    className="vbc-character-default"
                    style={
                        { backgroundImage: `url(${getResources(name.toLowerCase())})` }
                    }
                >
                </div>

                <div
                    className="vbc-character-hover"
                    style={
                        { backgroundImage: `url(${getResources(`${name.toLowerCase()}_hover`)})` }
                    }
                >
                </div>
            </div>
        </div>
    );
};

export default VbcCharacter;