const argv = require('yargs').argv;

module.exports = {
    dev: true,

    server: {
        port: argv.port || 3400
    }
};
