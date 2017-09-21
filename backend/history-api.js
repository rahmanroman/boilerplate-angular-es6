const history = require('connect-history-api-fallback');

module.exports = history({
    index: '/index.html',
    verbose: true,
    logger: function (...message) {
        console.log('[HAF]', message.join(' '));
    }
});
