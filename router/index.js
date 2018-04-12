const Router = require('express').Router;
const router = new Router();
const verifyToken = require('../libs/auth');

const user = require('../api/user');
const article = require('../api/article');

/**
 * @apiDefine master Token access only
 * You must pass a Bearer Token authorization header
 * to access a endpoint.
 */
router.use('*',verifyToken());

router.use('/users', user);
router.use('/articles', article);

exports = module.exports = router;
