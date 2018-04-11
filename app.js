'use strict';

const config = require('config');
const  http = require('http');

const morgan = require('morgan');

const express = require('express');
const app = express();
const router = require('./api/router');

app.use(morgan('short'));
app.use(router);
const server = http.createServer(app)

let conf = {
    server : config.get('server')
}

const MongoDB = require('./libs/mongodb');
const db = new MongoDB();
db.connect()
    .then(() => server.listen(conf.server.port, conf.server.ip, () => {
        console.log('[SERVER] Workast API listening on http://%s:%d', conf.server.ip, conf.server.port)
      }));

exports = module.exports = app;
