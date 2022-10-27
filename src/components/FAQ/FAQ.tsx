import { useContext, useMemo } from 'react';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';
import 'src/components/FAQ/FAQ.scss';
import FAQBlock from './FAQBlock';
import faq_5_table_cn_m from 'src/assets/images/faq_5_table_cn_m.png';
import faq_5_table_cn from 'src/assets/images/faq_5_table_cn.png';
import faq_5_table_tw_m from 'src/assets/images/faq_5_table_tw_m.png';
import faq_5_table_tw from 'src/assets/images/faq_5_table_tw.png';
import faq_5_table_en_m from 'src/assets/images/faq_5_table_en_m.png';
import faq_5_table_en from 'src/assets/images/faq_5_table_en.png';
import faq_6_image_cn_m from 'src/assets/images/faq_6_image_cn_m.png';
import faq_6_image_cn from 'src/assets/images/faq_6_image_cn.png';
import faq_6_image_tw_m from 'src/assets/images/faq_6_image_tw_m.png';
import faq_6_image_tw from 'src/assets/images/faq_6_image_tw.png';
import faq_6_image_en_m from 'src/assets/images/faq_6_image_en_m.png';
import faq_6_image_en from 'src/assets/images/faq_6_image_en.png';
import faq_6_table_cn_m from 'src/assets/images/faq_6_table_cn_m.png';
import faq_6_table_cn from 'src/assets/images/faq_6_table_cn.png';
import faq_6_table_tw_m from 'src/assets/images/faq_6_table_tw_m.png';
import faq_6_table_tw from 'src/assets/images/faq_6_table_tw.png';
import faq_6_table_en_m from 'src/assets/images/faq_6_table_en_m.png';
import faq_6_table_en from 'src/assets/images/faq_6_table_en.png';
import { EventContext } from 'src/Context/EventContext';

const FAQ = () => {
    const lang = useContext(LangContext);
    const {
        device,
        selectedLang
    } = useContext(EventContext);
    const images = useMemo(() => {
        if (selectedLang === 'ZH_TW') {
            if (device === 'desktop') {
                return {
                    faq_5_table: faq_5_table_tw,
                    faq_6_table: faq_6_table_tw,
                    faq_6_image: faq_6_image_tw
                };
            }
            return {
                faq_5_table: faq_5_table_tw_m,
                faq_6_table: faq_6_table_tw_m,
                faq_6_image: faq_6_image_tw_m
            };
        }

        else if (selectedLang === 'ZH_CN') {
            if (device === 'desktop') {
                return {
                    faq_5_table: faq_5_table_cn,
                    faq_6_table: faq_6_table_cn,
                    faq_6_image: faq_6_image_cn
                };
            }

            return {
                faq_5_table: faq_5_table_cn_m,
                faq_6_table: faq_6_table_cn_m,
                faq_6_image: faq_6_image_cn_m
            };
        }

        if (device === 'desktop') {
            return {
                faq_5_table: faq_5_table_en,
                faq_6_table: faq_6_table_en,
                faq_6_image: faq_6_image_en
            };
        }

        return {
            faq_5_table: faq_5_table_en_m,
            faq_6_table: faq_6_table_en_m,
            faq_6_image: faq_6_image_en_m
        };
    }, [lang, device]);

    return (
        <div
            id="FAQ"
            className="faq-container"
        >
            <div
                className="faq-headline"
                style={
                    { backgroundImage: `url(${getResources('faq')})` }
                }
            >
            </div>

            <FAQBlock idx={1} />
            {/* <FAQBlock idx={2} slotContent={
                <SocialIconButton social={socialList[1]} />
            } /> */}
            {/* <FAQBlock
                idx={6}
                slotContent={
                    <>
                        <img
                            style={{
                                display: 'block',
                                marginTop: '2rem',
                                marginBottom: '2rem',
                                width: device === 'desktop' ? '90%' : '100%',
                                height: 'auto'
                            }}
                            src={images.faq_6_image}
                            alt=""
                        />
                        <img
                            style={{
                                display: 'block',
                                marginTop: '2rem',
                                marginBottom: '2rem',
                                width: device === 'desktop' ? '90%' : '100%',
                                height: 'auto'
                            }}
                            src={images.faq_6_table}
                            alt=""
                        />
                    </>
                }
            /> */}
            {/* <FAQBlock idx={3} /> */}
            <FAQBlock idx={4} />
            <FAQBlock
                idx={5}
                slotContent={
                    <img
                        style={{
                            display: 'block',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            width: device === 'desktop' ? '90%' : '100%',
                            height: 'auto'
                        }}
                        src={images.faq_5_table}
                        alt=""
                    />
                }
            />
            <FAQBlock idx={7} />
        </div>
    );
};

export default FAQ;
