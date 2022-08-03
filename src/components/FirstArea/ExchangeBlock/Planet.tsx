import { useContext } from 'react';
import SharedPurpleButton from 'src/components/Shared/Buttons/SharedPurpleButton';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';
import 'src/components/FirstArea/ExchangeBlock/Planet.scss';

const Planet = () => {
    const lang = useContext(LangContext);
    const deepPurpleBg: React.CSSProperties = {
        backgroundColor: '#42076d'
    };

    return (
        <div className="planet">
            <div className="planet-button reification-spot">
                <SharedPurpleButton
                    disable={true}
                    style={deepPurpleBg}
                    onClick={() => {}}
                    text={lang.PLANET_BTN_REIFICATION}
                />
            </div>
            <div className="planet-button summon-betamon">
                <SharedPurpleButton
                    disable={true}
                    onClick={() => {}}
                    text={lang.PLANET_BTN_SUMMON_BETAMON}
                />
            </div>
            <div className="planet-button arena">
                <SharedPurpleButton
                    disable={true}
                    onClick={() => {}}
                    text={lang.PLANET_BTN_ARENA}
                />
            </div>
            <div className="planet-button b-bank">
                <SharedPurpleButton
                    disable={true}
                    onClick={() => {}}
                    text={lang.PLANET_BTN_B_BANK}
                />
            </div>
            <div className="planet-button planet-mine">
                <SharedPurpleButton
                    disable={true}
                    onClick={() => {}}
                    text={lang.PLANET_BTN_MARKET}
                />
            </div>

            <div
                className="planet-bg"
                style={
                    { backgroundImage: `url(${getResources('planet')})` }
                }
            >
            </div>
        </div>
    );
};

export default Planet;