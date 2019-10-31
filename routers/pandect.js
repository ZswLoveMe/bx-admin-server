const Router = require('koa-router')
let router = new Router()

const pandectControllers = require('../controllers/pandect')

router.prefix('/pandect')
router.post('/content',pandectControllers.getContent)
module.exports = router