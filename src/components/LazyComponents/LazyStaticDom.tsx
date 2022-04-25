import React, { useMemo } from "react";

const LazyStaticDom = ({ entry }: {
    entry: Promise<any>
}) => {
    const Dom = React.lazy(() => entry);
    const StaticDom = useMemo(() => <Dom />, []);

    return StaticDom;
};

export default LazyStaticDom;