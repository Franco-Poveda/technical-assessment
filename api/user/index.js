const Router = require('express').Router
const body = require('bodymen').middleware

const router = new Router()
const controller = require('./controller')

const User = require('./model')
const { name, avatar } = User.schema.tree

/**
 * @api {get} /users/:id Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 */
router.get('/:id', controller.show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [avatar] User's picture url.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 */
router.post('/', controller.create)
exports = module.exports = router
