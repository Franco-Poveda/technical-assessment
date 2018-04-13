'use strict'

const Router = require('express').Router
const body = require('bodymen').middleware
const query = require('querymen').middleware

const controller = require('./controller')
const Article = require('./model')

const { title, text, tags, userId } = Article.schema.tree
const router = new Router()

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiPermission Bearer token.
 * @apiParam {String[]} [tags] array tags filter.
 * @apiSuccess {Object[]} 200 articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master token access only.
 * @apiExample {curl} Example usage:
 * curl -X GET \
 *  'http://0.0.0.0:3000/articles?tags=sports,news' \
 *  -H 'Authorization: Bearer 5CD4ED173E1C95FE763B753A297D5'
 */
router.get('/', query({ tags }), controller.show)

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiPermission Bearer token.
 * @apiParam {String} title Article's title.
 * @apiParam {String} text Article's text.
 * @apiParam {String[]} [tags] Article's tags array.
 * @apiParam {String} userId Article's user entity relation (refer user must exist).
* @apiSuccess {Object} article created article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *   http://0.0.0.0:3000/articles \
 *  -H 'Authorization: Bearer 5CD4ED173E1C95FE763B753A297D5' \
 *  -H 'Content-Type: application/json' \
 *  -d {
	"title":"article title",
	"text":"article text",
	 "tags": ["news"],
	 "userId":"5acdd1b051720cf0a96cd5d0"
}'
 */
router.post('/', body({ title, text, tags, userId }), controller.create)

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiPermission Bearer token.
 * @apiParam title Article's title.
 * @apiParam text Article's text.
 * @apiParam tags Article's tags.
 * @apiParam {String} userId Article's user entity relation (refer user must exist).
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 master token access only.
 * @apiExample {curl} Example usage:
 * curl -X PUT \
  http://0.0.0.0:3000/articles/5acdd740429073f3a8719bf6 \
  -H 'Authorization: Bearer 5CD4ED173E1C95FE763B753A297D5' \
  -H 'Content-Type: application/json' \
  -d '    {
        "title": "article 99",
        "text": "text for article 99",
        "tags": [
            "news","none"
        ],
        "userId": "5acfa4eaea2db91b271669f4"
    }'
 */
router.put('/:id', body({ title, text, tags, userId }), controller.update)

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission Bearer token.
 * @apiSuccess (Success 204) 204 Content destroyed.
 * @apiError 404 Article not found.
 * @apiError 401 master token access only.
 * @apiExample {curl} Example usage:
 * curl -X DELETE \
  http://0.0.0.0:3000/articles/5acdbb52ae1c1be15a1c686c
 */
router.delete('/:id', controller.destroy)

exports = module.exports = router
