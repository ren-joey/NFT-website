import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import 'src/components/FAQ/FAQ.scss';

const FAQ = () => {
    const lang = useContext(LangContext);

    return (
        <div className="faq-container">
            <div className="faq-title" style={
                { backgroundImage: `url(${getResources('faq')})` }
            }></div>
        </div>
    );
};

export default FAQ;