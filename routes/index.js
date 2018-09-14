const Express = require('express')
const dishesRouter = require('./dishes_router.js')
const menuRouter = require('./menu_router.js')
const userRouter = require('./user_router.js')
const apiRouter = Express.Router();

apiRouter.use('/dishes', dishesRouter);
apiRouter.use('/menus', menuRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
