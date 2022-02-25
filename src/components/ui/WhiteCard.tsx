import React from "react";

interface IProps {
    body: JSX.Element
}

const WhiteCard = ({ body }: IProps) => (
    <div className="my-2 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex justify-center">
        { body }
    </div>
);

export default WhiteCard;