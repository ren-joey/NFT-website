import { useContext } from 'react';
import 'src/components/AboutB.scss'
import { langContext } from 'src/Context/LangContext';

const AboutB = () => {
    const lang = useContext(langContext);
    return (
        <div className="about-b">
            <div className="desc-area">
                <div className="guide-line">
                    <div className="line">
                        <div className="skull"></div>
                        <div className="star"></div>
                    </div>
                </div>
                <div className="content">
                    <div className="title-img"></div>
                    <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_DESC}}></div>
                </div>
            </div>

            <div className="feature-card-area">
                <div className="feature-card-row">
                    <div className="feature-card">
                        <div className="feature-card-icon idx-1"></div>
                        <div className="card-body">
                            <div className="title" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_1_TITLE}}></div>
                            <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_1_DESC}}></div>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card-icon idx-2"></div>
                        <div className="card-body">
                            <div className="title" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_2_TITLE}}></div>
                            <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_2_DESC}}></div>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card-icon idx-3"></div>
                        <div className="card-body">
                            <div className="title" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_3_TITLE}}></div>
                            <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_3_DESC}}></div>
                        </div>
                    </div>
                </div>
                <div className="feature-card-row">
                    <div className="aside"></div>
                    <div className="feature-card">
                        <div className="feature-card-icon idx-5"></div>
                        <div className="card-body">
                            <div className="title" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_5_TITLE}}></div>
                            <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_5_DESC}}></div>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card-icon idx-4"></div>
                        <div className="card-body">
                            <div className="title" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_4_TITLE}}></div>
                            <div className="desc" dangerouslySetInnerHTML={{__html: lang.ABOUT_B_CARD_4_DESC}}></div>
                        </div>
                    </div>
                    <div className="aside">
                        <div className="b-alien-slider">
                            <div className="b-alien"></div>
                        </div>

                        <div className="line-right-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutB;