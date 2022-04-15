const metamaskRedirect = (url: string = window.location.href) => {
    const cUrl = new URL(url);
    cUrl.searchParams.set('auto-login', 'true');
    const fixedUrl = cUrl.toString().replace(/^htt(p|s):\/\//g, '');
    window.open('https://metamask.app.link/dapp/' + fixedUrl);
};

export default metamaskRedirect;