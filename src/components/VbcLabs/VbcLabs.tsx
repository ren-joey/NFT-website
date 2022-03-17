import { useContext, useState } from "react";
import 'src/components/VbcLabs/VbcLabs/scss';
import { LangContext } from "src/Context/LangContext";

const VbcLabs = () => {
    const lang = useContext(LangContext);

    return (
        <div className="vbc-labs-wrapper">
            <div className="first-section">
                <div className="info">
                    <div className="title"></div>
                    <div className="content"></div>
                </div>

                <div className="ceo-area">

                </div>
            </div>

            <div className="slashes-divider">
                <div className="content"></div>
            </div>

            <div className="second-section"></div>

            <div className="slashes-divider">
                <div className="content"></div>
            </div>
        </div>
    );
};

export default VbcLabs;