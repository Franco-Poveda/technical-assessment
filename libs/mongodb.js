'use strict';

const mongoose = require('mongoose');
const config = require('config');

class Mongodb {

    constructor() {
        this.conf = config.get('mongodb');
    }

    connect() {
        let uri = config.get('mongodb').uri;
        const promise = new Promise(function _mongoExecutor(resolve, reject) {
            mongoose.connect(uri,
                (err) => {
                    if (err) {
                        console.log('info', `[MONGODB][${err}]`);
                        return reject(err);
                    }
                    console.log(`[MONGODB] Connected ${uri}`);
                    return resolve();
                }
            );
        });

        return promise;
    }
}

module.exports = Mongodb;