import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";

const Planet = () => {
    const {

    } = useContext(LangContext);

    return (
        <div className="planet">
            <div className="planet-bg" style={
                { backgroundImage: `url(${getResources('planet')})` }
            }></div>
        </div>
    );
};

export default Planet;