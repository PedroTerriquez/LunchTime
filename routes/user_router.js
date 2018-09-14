const Express = require('express')
const params = require('params')
const User = require('../db/user.js');

const userRouter = Express.Router();
const permittedParams = ['_id', 'name', 'email', 'created_at', 'updated_at']

userRouter.post('',(req, res) => {
	var new_user = User(user_params(req.body));
	new_user.save((err, user) =>{
		res.json(201,user);
	})
});

function user_params(body) {
	return params(body).only(permittedParams)
}

module.exports = userRouter;
