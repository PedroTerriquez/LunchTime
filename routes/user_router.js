const Express = require('express');
const params = require('params');
const User = require('../db/model/user.js');
const bcrypt = require('bcrypt');

const userRouter = Express.Router();
const permittedParams = ['_id', 'name', 'email', 'password']

userRouter.post('',(req, res) => {
	var new_user = User(user_params(req.body));
	bcrypt.hash(new_user.password, 10, function (err, hash){
		if (err) {
    	return err;
  	}
  	new_user.password = hash
		new_user.save((err, user) =>{
			res.status(201).json(201,user);
		})
  })
});

function user_params(body) {
	return params(body).only(permittedParams)
}

module.exports = userRouter;
