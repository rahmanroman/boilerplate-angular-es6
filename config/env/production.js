const argv = require('yargs').argv;

module.exports = {
    dev: false,

    server: {
        port: argv.port || 8080
    }
};
