import React from "react";

const LazyStaticDom = ({ entry }: {
    entry: Promise<any>
}) => {
    const Dom = React.lazy(() => entry);

    return <Dom />;
};

export default LazyStaticDom;