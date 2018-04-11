const Router = require('express').Router;
const router = new Router();
const controller = require('./controller');
const verifyToken = require('../../libs/auth');

router.get('/', verifyToken(), controller.show)
exports = module.exports = router;