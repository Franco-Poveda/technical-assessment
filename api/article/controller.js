const mongoose = require('mongoose');

require('./model');
const Article = mongoose.model('article');

module.exports = {
    get,
    show
  };

function get ( req, res) {
    console.log("get controller");
    Article.find()
    .then((art) => {
        console.log(art);
        })
    .then(res.status(200).json({}))
    .catch(res.end())
}

function show ({ params }, res, next) {
    console.log("show controller");

  Article.findById("5acd87bc74083a411a637ed7")
    .then(notFound(res))
    .then((article) => article ? article.view() : null)
    .then(success(res))
    .catch(next)
}

const success = (res, status) => (entity) => {
    if (entity) {
      res.status(status || 200).json(entity)
    }
    return null
  }
  
const notFound = (res) => (entity) => {
    if (entity) {
      return entity
    }
    res.status(404).end()
    return null
  }