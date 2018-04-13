'use strict';

const { success, notFound, badRequest } = require('../../libs/response');
const Article = require('./model');

module.exports = {
    create,
    show,
    update,
    destroy
};

/* create action */
function create({ bodymen: { body } }, res, next) {
    Article.create(body)
        .then((article) => article.view(true))
        .then(success(res, 201))
        .catch(err => badRequest(err, res))
}

/* show action */
function show({ querymen: { query } }, res, next) {
    Article.find(query)
        .then(notFound(res))
        .then((articles) => articles.map((article) => article.view(true)))
        .then(success(res))
        .catch(next)
}

/* update action */
function update({ bodymen: { body }, params }, res, next) {
    Article.findById(params.id)
        .then(notFound(res))
        .then((article) => article ? Object.assign(article, body).save() : null)
        .then((article) => article ? article.view(true) : null)
        .then(success(res))
        .catch(err => badRequest(err, res))
};

/* destroy action */
function destroy({ params }, res, next) {
    Article.findById(params.id)
        .then(notFound(res))
        .then((article) => article ? article.remove() : null)
        .then(success(res, 204))
        .catch(err => badRequest(err, res))
}


