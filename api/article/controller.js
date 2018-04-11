const mongoose = require('mongoose');
const success = require('../../libs/response').success;
const notFound = require('../../libs/response').notFound;

require('./model');
const Article = mongoose.model('article');

module.exports = {
    create,
    show,
    update,
    destroy
  };

  function create (req, res, next) {
  Article.create(req.bodymen.body)
    .then((article) => article.view(true))
    .then(success(res, 201))
    .catch(next)
  }

function show ({ params }, res, next) {
  Article.find({})
    .then(notFound(res))
    .then((articles) => articles.map((article) => article.view(true)))
    .then(success(res))
    .catch(next)
}

function update ({ bodymen: { body }, params }, res, next) {
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? Object.assign(article, body).save() : null)
    .then((article) => article ? article.view(true) : null)
    .then(success(res))
    .catch((err) => {
        /* istanbul ignore else */
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
function destroy ({ params }, res, next) {
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? article.remove() : null)
    .then(success(res, 204))
    .catch((err) => {
        /* istanbul ignore else */
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


