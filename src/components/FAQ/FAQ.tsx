import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import 'src/components/FAQ/FAQ.scss';
import FAQBlock from "./FAQBlock";

const FAQ = () => {
    const lang = useContext(LangContext);

    return (
        <div id="FAQ" className="faq-container">
            <div className="faq-headline" style={
                { backgroundImage: `url(${getResources('faq')})` }
            }></div>

            {
                Array(8).fill(1).map((value, idx) => (
                    <FAQBlock idx={idx + 1} key={idx} />
                ))
            }
        </div>
    );
};

export default FAQ;