'use strict';

const Router = require('express').Router
const body = require('bodymen').middleware

const router = new Router()
const controller = require('./controller')

const User = require('./model')
const { name, avatar } = User.schema.tree

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission Bearer token.
 * @apiSuccess {Object} user
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 * @apiError 404 resource not found.
 * @apiExample {curl} Example usage:
 * curl -X GET \
 *  http://0.0.0.0:3000/users/5acdd1b051720cf0a96cd5d0 \
 *  -H 'Authorization: Bearer 5CD4ED173E1C95FE763B753A297D5'
 */
router.get('/:id', controller.show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission Bearer token.
 * @apiParam {String} name User's name.
 * @apiParam {String} avatar User's picture url.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *   http://0.0.0.0:3000/users \
 *  -H 'Authorization: Bearer 5CD4ED173E1C95FE763B753A297D5' \
 *  -H 'Content-Type: application/json' \
 *  -d '{
 *      "name":"Franco",
 *      "avatar":"http://some.domain.io/img.png"
 *      }'
 */
router.post('/', body({ name, avatar }), controller.create)
exports = module.exports = router
