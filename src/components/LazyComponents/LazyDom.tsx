import React from "react";

const LazyDom = ({ entry }: {
    entry: Promise<any>
}) => {
    const Dom = React.lazy(() => entry);

    return Dom;
};

export default LazyDom;