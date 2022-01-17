import { useContext } from 'react';
import 'src/components/Roadmap.scss'
import { langContext } from 'src/Context/LangContext';

const Roadmap = () => {
    const lang = useContext(langContext)
    return (
        <div className="roadmap">
            <div className="desc-area">
                <div className="guide-line">
                    {/* <div className="line">
                        <div className="star"></div>
                    </div> */}
                </div>
                <div className="title-img"></div>
            </div>

            <div className="roadmap-card-row">
                <div className="roadmap-time">
                    <div className="time" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_1_DATE}}></div>
                </div>
                <div className="roadmap-main">
                    <div className="roadmap-card">
                        <div className="card-top">
                            <div className="title"
                                dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_1_TITLE}}
                            ></div>
                            <div className="subtitle"
                                dangerouslySetInnerHTML={
                                    {__html: lang.ROADMAP_CARD_1_SUBTITLE}
                                }></div>
                        </div>
                        <div className="card-bottom">
                            <div className="remark" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_1_REMARK}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="roadmap-card-row">
                <div className="roadmap-time">
                    <div className="time" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_2_DATE}}></div>
                </div>
                <div className="roadmap-main">
                    <div className="roadmap-card">
                        <div className="card-top">
                            <div className="title"
                                dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_2_TITLE}}
                            ></div>
                            <div className="subtitle"
                                dangerouslySetInnerHTML={
                                    {__html: lang.ROADMAP_CARD_2_SUBTITLE}
                                }></div>
                        </div>
                        <div className="card-bottom">
                            <div className="remark" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_2_REMARK}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="roadmap-card-row">
                <div className="roadmap-time">
                    <div className="time" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_3_DATE}}></div>
                </div>
                <div className="roadmap-main">
                    <div className="roadmap-card">
                        <div className="card-top">
                            <div className="title"
                                dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_3_TITLE}}
                            ></div>
                            <div className="subtitle"
                                dangerouslySetInnerHTML={
                                    {__html: lang.ROADMAP_CARD_3_SUBTITLE}
                                }></div>
                        </div>
                        <div className="card-bottom">
                            <div className="remark" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_3_REMARK}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="roadmap-card-row">
                <div className="roadmap-time">
                    <div className="time" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_4_DATE}}></div>
                </div>
                <div className="roadmap-main">
                    <div className="roadmap-card">
                        <div className="card-top">
                            <div className="title"
                                dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_4_TITLE}}
                            ></div>
                            <div className="subtitle"
                                dangerouslySetInnerHTML={
                                    {__html: lang.ROADMAP_CARD_4_SUBTITLE}
                                }></div>
                        </div>
                        <div className="card-bottom">
                            <div className="remark" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_4_REMARK}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="roadmap-card-row">
                <div className="roadmap-time">
                    <div className="time" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_5_DATE}}></div>
                </div>
                <div className="roadmap-main">
                    <div className="roadmap-card">
                        <div className="card-top">
                            <div className="title"
                                dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_5_TITLE}}
                            ></div>
                            <div className="subtitle"
                                dangerouslySetInnerHTML={
                                    {__html: lang.ROADMAP_CARD_5_SUBTITLE}
                                }></div>
                        </div>
                        <div className="card-bottom">
                            <div className="remark" dangerouslySetInnerHTML={{__html: lang.ROADMAP_CARD_5_REMARK}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roadmap;