const Router = require('express').Router;
const body = require('bodymen').middleware;

const router = new Router();
const controller = require('./controller');
const verifyToken = require('../../libs/auth');

router.get('/', verifyToken(), controller.show);
router.post('/', verifyToken(),
    body({
        name: {
            type: String,
            required: true,
            minlength: 4
        },
        avatar: {
            type: String,
            required: true
        }
    }), controller.create);
exports = module.exports = router;

