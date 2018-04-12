'use strict';

const mongoose = require('mongoose')
const { success, notFound, badRequest } = require('../../libs/response');
const User = require('./model')

module.exports = {
  create,
  show
}

function create ({ bodymen: { body } }, res, next) {
  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch((err) => {
      /* istanbul ignore else */
      if (err.errors.avatar) {
        res.status(400).json({
          valid: false,
          param: err.errors.avatar.path,
          message: err.errors.avatar.message
        })
      } else {
        next(err)
      }
    })
}

function show ({ params }, res, next) {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)
}
