const Router = require('express').Router;
const router = new Router();
const body = require('bodymen').middleware;

const controller = require('./controller');
const verifyToken = require('../../libs/auth');

router.get('/', verifyToken(), controller.show);
router.post('/', verifyToken(),
    body({
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String,
            required: true,
            minlength: 5
        },
        tags: [String],
        userId: {
            type: String,
            required: true,
            minlength: 24
        }
    }), controller.create);

router.put('/:id',
    verifyToken(),
    body({
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String,
            required: true,
            minlength: 5
        },
        tags: [String],
        userId: String
    }),
    controller.update);

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
    verifyToken(),
    controller.destroy);

exports = module.exports = router;