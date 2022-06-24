const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'https://www.vbc-labs.com',
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    );
};