import { useContext, useMemo } from 'react';
import SharedAlert from 'src/components/Shared/SharedAlert';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';
import 'src/components/FirstArea/ExchangeBlock/Alerts/FaqAlert.scss';
import collapseHeader from 'src/animation/collapseHeader';
import faq_6_image_en_m from 'src/assets/images/faq_6_image_en_m.png';

const FaqAlert = () => {
    const lang = useContext(LangContext);
    const { selectedLang } = useContext(EventContext);
    const faqBgImage = useMemo(() => {
        if (selectedLang === 'ZH_CN') {
            return getResources('exchange_phase_rules_cn');
        } else if (selectedLang === 'ZH_TW') {
            return getResources('exchange_phase_rules');
        } else {
            return faq_6_image_en_m;
        }
    }, [selectedLang]);

    return (
        <SharedAlert
            id="faq"
            content={
                <>
                    <div className="alert-title">
                        {lang.EXCHANGE_FAQ_TITLE}
                    </div>
                    <div className="faq-content">
                        <div
                            className="faq-image"
                            style={
                                { backgroundImage: `url(${faqBgImage})` }
                            }
                        >
                        </div>
                    </div>
                </>
            }
            btnList={[]}
            className="start"
            closeBtnEnable={true}
            onStart={collapseHeader}
        />
    );
};

export default FaqAlert;