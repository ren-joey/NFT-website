interface Props {
    text: string
}

const ShredPurpleButton = ({ text }: Props) => {
    const a = 1;

    return (
        <div>
            <div className="text">
                {text}
            </div>

            <div className="corner-border left top"></div>
            <div className="corner-border left bottom"></div>
            <div className="corner-border right bottom"></div>
            <div className="corner-border right bottom"></div>
        </div>
    );
};

export default ShredPurpleButton;