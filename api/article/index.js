const Router = require('express').Router;
const router = new Router();

router.get('/', (req, res) => res.send('Hello articles!'))
exports = module.exports = router;