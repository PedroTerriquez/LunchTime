const Express = require('express')
const dishesRouter = require('./dishes_router.js')
const menuRouter = require('./menu_router.js')
const apiRouter = Express.Router();

apiRouter.use('/dishes', dishesRouter)
apiRouter.use('/menu', menuRouter)

module.exports = apiRouter;
