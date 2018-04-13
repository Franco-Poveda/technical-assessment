'use strict';

const chalk = require('chalk');
const log = console.log;
const config = require('config').get('server');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const queryErrorHandler = require('querymen').errorHandler;
const bodyErrorHandler = require('bodymen').errorHandler;
const router = require('./router');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));
app.use(router);
app.use(queryErrorHandler())
app.use(bodyErrorHandler())

const server = http.createServer(app)

let ip = process.env.IP || config.ip;
let port = process.env.PORT || config.port;


const MongoDB = require('./libs/mongodb');
const db = new MongoDB();
db.connect()
  .then(() => server.listen(port, ip, () => {
    log(chalk.cyan('[SERVER] Workast API listening on http://%s:%d'), ip, port)
  }));


module.exports = app;
