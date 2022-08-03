import React, { useContext, useMemo } from 'react';
import 'src/components/VbcLabs/SlashesDivider.scss';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';

interface IProps {
    content: string
}

const SlashesDivider = ({ content }: IProps) => {
    const { device } = useContext(EventContext);
    const backgroundStyle = useMemo<React.CSSProperties>(() => {
        if (device === 'desktop') return {
            backgroundImage: `url(${getResources('slashes_divider')})`
        };
        return {};
    }, [device]);

    return (
        <div className="slashes-divider-wrapper">
            <div
                className="slashes-divider"
                style={backgroundStyle}
            >
                <div
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default SlashesDivider;