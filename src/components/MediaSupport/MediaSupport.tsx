import { useContext, useMemo, useState } from "react";
import 'src/components/KolSupport/KolSupport.scss';
import { LangContext } from "src/Context/LangContext";
import gaParser from "src/functions/gaParser";
import { getResources } from "src/functions/loader";

interface IProps {
    total: number;
}

const MediaSupport = ({ total }: IProps) => {
    const [mediaIndex, setMediaIndex] = useState(0);
    const lang = useContext(LangContext);
    const [type, imageHref, title, href] = useMemo(() => {
        const title = lang[`MEDIA_${mediaIndex + 1}_TITLE`];
        const imageHref = lang[`MEDIA_${mediaIndex + 1}_IMAGE`];
        const href = lang[`MEDIA_${mediaIndex + 1}_HREF`];
        if (!imageHref) return ['', '', title, href];

        const regex = /\[iframe\].*/g;
        if (regex.test(imageHref)) {
            return ['iframe', imageHref.replace('[iframe]', ''), title, href];
        }
        return ['image', imageHref.replace('[image]', ''), title, href];
    }, [mediaIndex]);

    const nextMedia = () => setMediaIndex((mediaIndex + 1) % total);
    const prevMedia = () => setMediaIndex((mediaIndex + (total - 1)) % total);

    const linkTo = () => {
        if (!href) return;

        gaParser('主站', title || '', '0318版網站');
        window.open(href, '_blank');
    };

    const iframeBody = () => {
        switch(type) {
            case 'iframe':
                return (
                    <div className="iframe-image media">
                        <iframe
                            width="100%"
                            height="auto"
                            src={imageHref}
                            title={title}
                        ></iframe>
                    </div>
                );
            case 'image':
                return (
                    <div className="iframe-image media" style={
                        { backgroundImage: `url(${imageHref})` }
                    } />
                );
            default:
                return (
                    <div className="iframe-image media">
                        <div className="text">
                            {lang.UNDER_CONSTRUCTION}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="iframe-slider-wrapper">

            <div className="slider-title-wrapper">
                <div className="slider-title media" style={
                    { backgroundImage: `url(${getResources('media_support')})` }
                }></div>
                <div className="slider-title-betamon ktv" style={
                    { backgroundImage: `url(${getResources('ktv_betamon')})` }
                }></div>
            </div>

            <div className="slider-card">
                <div className="iframe-slider">
                    <div
                        className="slider-arrow left"
                        style={
                            { backgroundImage: `url(${getResources('arrow_right_shadow')})` }
                        }
                        onClick={() => prevMedia()}
                    ></div>

                    <div className="iframe-container">
                        <div className="iframe-body">
                            { iframeBody() }
                        </div>

                        <div className="iframe-footer" onClick={() => linkTo()}>
                            <div className="chain-icon" style={
                                { backgroundImage: `url(${getResources('chain_icon')})` }
                            }></div>

                            <div className="text">
                                { title }
                            </div>

                            <div className="right-arrow" style={
                                { backgroundImage: `url(${getResources('arrow_right')})` }
                            }></div>
                        </div>
                    </div>

                    <div
                        className="slider-arrow right"
                        style={
                            { backgroundImage: `url(${getResources('arrow_right_shadow')})` }
                        }
                        onClick={() => nextMedia()}
                    ></div>
                </div>

                <div className="slider-options">
                    {
                        Array(total).fill(0).map((val, idx) => (
                            <div
                                className={`slider-button ${idx === mediaIndex ? 'active' : ''}`}
                                key={idx}
                                onClick={() => setMediaIndex(idx)}
                            >
                                <div className="star-icon" style={
                                    { backgroundImage: `url(${getResources('star_icon')})` }
                                }></div>
                                <div className="text">
                                    {lang[`MEDIA_${idx + 1}_BTN`]}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaSupport;