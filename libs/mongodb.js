'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('config');


class Mongodb {

    constructor() {
        this.conf = config.get('mongodb');
    }

    connect() {
        //this.loadModels();
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

    loadModels() {
        forDir(this.conf.models || `${process.pwd()}/models`, function (file) {
            try {
                if (path.extname(file) === '.js') {
                    require(file);
                }
            } catch (e) {
                throw e;
            }
        });
    }
}

function forDir(path, loadTemplates, fn) {
    if (!fn) {
        fn = loadTemplates;
        loadTemplates = false;
    }

    const dir = fs.readdirSync(path);

    dir.forEach(function eachDirFn(file) {
        if (fs.lstatSync(path + '/' + file).isFile()) {
            if (!loadTemplates && file.indexOf('_template') > -1) {
                return;
            }
            return fn(path + '/' + file);
        }
        return forDir(`${path}/${file}/`, loadTemplates, fn);
    });
}

module.exports = Mongodb;