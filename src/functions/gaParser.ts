const gaParser = (origin: string, redirect: string) => {
    const { gtag }: any = window;

    gtag('event', 'initialized', { event_category: 'page_view' });

    if (origin) {
        gtag('event', origin, { event_category: 'origin' });
    }

    if (redirect) {
        gtag('event', redirect, { event_category: 'redirect' });
    }
};

export default gaParser;