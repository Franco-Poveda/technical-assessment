'use strict';

const { success, notFound, badRequest } = require('../../libs/response');
const User = require('./model')

module.exports = {
  create,
  show
}

/* create action */
function create({ bodymen: { body } }, res, next) {
  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch(err => badRequest(err, res))
}

/* show action */
function show({ params }, res, next) {
  User.findOne({ _id: params.id })
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(err => badRequest(err, res))
}
