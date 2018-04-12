'use strict';

const { success, notFound, badRequest } = require('../../libs/response');
const Article = require('./model');

module.exports = {
    create,
    show,
    update,
    destroy
};

function create({ bodymen: { body } }, res, next) {
    Article.create(body)
        .then((article) => article.view(true))
        .then(success(res, 201))
        .catch((err) => {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.status(400).json({
                    valid: false,
                    param: err.errors,
                    message: err._message
                })
            } else {
                next(err)
            }
        })
}

function show({ query }, res, next) {
    const tags = JSON.parse(query.tags);
    Article.find({ tags: { "$in": tags } })
        .then(notFound(res))
        .then((articles) => articles.map((article) => article.view(true)))
        .then(success(res))
        .catch(next)
}

function update({ bodymen: { body }, params }, res, next) {
    Article.findById(params.id)
        .then(notFound(res))
        .then((article) => article ? Object.assign(article, body).save() : null)
        .then((article) => article ? article.view(true) : null)
        .then(success(res))
        .catch((err) => {
            if (err.name == 'ValidationError') {
                res.status(400).json({
                    valid: false,
                    param: err.path,
                    message: 'invalid id format'
                })
            } else {
                next(err)
            }
        })
}
function destroy({ params }, res, next) {
    Article.findById(params.id)
        .then(notFound(res))
        .then((article) => article ? article.remove() : null)
        .then(success(res, 204))
        .catch((err) => {
            if (err.name == 'CastError') {
                res.status(400).json({
                    valid: false,
                    param: err.path,
                    message: 'invalid id format'
                })
            } else {
                next(err)
            }
        })
}


