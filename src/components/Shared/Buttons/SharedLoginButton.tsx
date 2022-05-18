import { useContext } from "react";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import MintButton from "./MintButton";

const SharedLoginButton = () => {
    const { buttonSize } = useContext(EventContext);
    const lang = useContext(LangContext);

    return (
        <MintButton
            text={lang.LINK_WALLET}
            style={buttonSize}
            onClick={() => {
                EventBus.$emit('fetchLogin');
            }}
        />
    );
};

export default SharedLoginButton;