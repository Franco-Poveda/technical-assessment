'use strict'

const Router = require('express').Router
const body = require('bodymen').middleware

const controller = require('./controller')
const Article = require('./model')

const { title, text, tags, userId } = Article.schema.tree
const router = new Router()

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiPermission master
 * @apiParam {String[]} [tags] array tags filter.
 * @apiSuccess {Object[]} 200 articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 */
router.get('/', controller.show)

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam title Article's title.
 * @apiParam text Article's text.
 * @apiParam {String[]} tags Article's tags array.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.post('/', body({ title, text, tags, userId }), controller.create)

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam title Article's title.
 * @apiParam text Article's text.
 * @apiParam tags Article's tags.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 master token access only.
 */
router.put('/:id', body({ title, text, tags, userId }), controller.update)

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 * @apiError 401 master token access only.
 */
router.delete('/:id', controller.destroy)

exports = module.exports = router
