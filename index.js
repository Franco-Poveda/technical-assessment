'use strict';

const chalk = require('chalk');
const log = console.log;

if (process.env.TOKEN_KEY === undefined) {
    log(chalk.red('[ERROR] env TOKEN_KEY must be set!'));
    process.exit(1);
}
require('./app');