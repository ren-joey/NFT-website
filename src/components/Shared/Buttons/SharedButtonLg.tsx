import { useContext } from "react";
import { EventContext } from "src/Context/EventContext";
import MintButton from "./MintButton";

interface Props {
    onClick: () => void,
    text: string
}

const SharedButtonLg = ({
    onClick,
    text
}: Props) => {
    const { buttonSize } = useContext(EventContext);

    return (
        <MintButton
            text={text}
            style={buttonSize}
            onClick={onClick}
        />
    );
};

export default SharedButtonLg;