const mongoose = require('mongoose');

require('./model');
const User = mongoose.model('user');

module.exports = {
    get,
    show
  };

function get ( req, res) {
    console.log("get controller");
    User.find()
    .then((art) => {
        console.log(art);
        })
    .then(res.status(200).json({}))
    .catch(res.end())
}

function show ({ params }, res, next) {
    console.log("show user");

  User.findById("5acdac6074083a411a638c6a")
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
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