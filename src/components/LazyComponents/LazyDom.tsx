import React, { Suspense } from 'react';

const LazyDom = ({ entry }: {
    entry: Promise<any>
}) => {
    const Dom = React.lazy(() => entry);
    return (
        <Suspense fallback={null}>
            <Dom />
        </Suspense>
    );
};

export default LazyDom;