const Express = require('express')
const dishesRouter = require('./dishes_router.js')
const apiRouter = Express.Router();

apiRouter.use('/dishes', dishesRouter)

module.exports =  apiRouter;
