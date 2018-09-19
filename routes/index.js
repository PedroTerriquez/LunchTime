const Express = require('express')
const params = require('params');
const bcrypt = require('bcrypt')

const dishesRouter = require('./dishes_router.js')
const menuRouter = require('./menu_router.js')
const userRouter = require('./user_router.js')
const User = require('../db/user.js');

const apiRouter = Express.Router();

apiRouter.use('/dishes', dishesRouter);
apiRouter.use('/menus', menuRouter);
apiRouter.use('/users', userRouter);

apiRouter.post('/login',(req, res) => {
	User.findOne({email: req.body.email},(err, user) => {
		let password = req.body.password
		bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
          res.json(user);
        }
      	else
      		res.json(err)
    })
	})
})

apiRouter.post('/logout',(req, res) => {
	res.json("adios perro")
})

module.exports = apiRouter;
