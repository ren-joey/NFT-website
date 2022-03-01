const gaParser = (
    event_category: string,
    action: string,
    event_label: string
) => {
    const { gtag }: any = window;
    gtag('event', action, { event_category, event_label });
};

export default gaParser;