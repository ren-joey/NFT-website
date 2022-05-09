import { useContext } from "react";
import { EventContext } from "src/Context/EventContext";
import MintButton from "./MintButton";

interface Props {
    onClick: () => void,
    text: string,
    disable?: boolean
}

const SharedButtonLg = ({
    onClick,
    text,
    disable = false
}: Props) => {
    const { buttonSize } = useContext(EventContext);

    return (
        <MintButton
            disable={disable}
            text={text}
            style={buttonSize}
            onClick={onClick}
        />
    );
};

export default SharedButtonLg;