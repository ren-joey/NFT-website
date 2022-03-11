import { useContext, useEffect } from "react";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";

interface IProps {
    idx: number
}

const FAQBlock = ({ idx }: IProps) => {
    const lang = useContext(LangContext);
    const title = lang[`FAQ_${idx}_TITLE`];
    const content = lang[`FAQ_${idx}_CONTENT`];
    const contentImage = lang[`FAQ_${idx}_CONTENT_IMAGE`];
    const content2 = lang[`FAQ_${idx}_CONTENT_2`];

    return (
        <div className="faq-block">
            <div className="faq-skull-icon" style={
                { backgroundImage: `url(${getResources('skull_icon')})` }
            }></div>
            <div className="body">
                <div
                    className="faq-title"
                    dangerouslySetInnerHTML={{__html: title}}
                ></div>
                <div
                    className="faq-content"
                    dangerouslySetInnerHTML={{__html: content}}
                ></div>

                {
                    contentImage && (
                        <div className="faq-content" dangerouslySetInnerHTML={{__html: content2}}></div>
                    )
                }

                {
                    content2 && (
                        <div className="faq-content" dangerouslySetInnerHTML={{__html: content2}}></div>
                    )
                }
            </div>
        </div>
    );
};

export default FAQBlock;