import { useContext } from 'react';
import { EventBus } from 'src/bus';
import ethConfig from 'src/configs/ethConfig';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import MintButton from './MintButton';

const SharedLoginButton = () => {
    const { buttonSize } = useContext(EventContext);
    const lang = useContext(LangContext);

    return (
        <MintButton
            text={
                ethConfig.exchangeOpen
                    ? lang.LINK_WALLET
                    : lang.COMING_SOON
            }
            style={buttonSize}
            onClick={() => {
                EventBus.$emit('fetchLogin');
            }}
            disable={!ethConfig.exchangeOpen}
        />
    );
};

export default SharedLoginButton;