const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/todo-history', {
            target: 'http://localhost:3001/'
        })
    );
};