import React, { Suspense } from 'react';

interface Props {
    entry: Promise<any>
}

const LazyStaticDom = React.memo(function LazyStaticDom({
    entry
}: Props) {
    const Dom = React.lazy(() => entry);
    return (
        <Suspense fallback={null}>
            <Dom />
        </Suspense>
    );
});

export default LazyStaticDom;