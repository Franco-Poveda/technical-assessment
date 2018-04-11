const Router = require('express').Router;
const router = new Router();

const user = require('./user');
const article = require('./article');


router.use('/users', user);
router.use('/articles', article);

exports = module.exports = router;
