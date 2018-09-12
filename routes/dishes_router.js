const Express = require('express');
const params = require('params');
const Dish = require('../db/dish.js');

const dishesRouter = Express.Router();
const permittedParams = ['_id', 'name', 'description', 'ingredients'];

dishesRouter.get('', (req, res) => {
	Dish.find({}, (err, dishes) => {
		res.send(dishes);
	})
});

dishesRouter.get('/:id', (req, res) => {
	Dish.findOne({_id: req.params.id}, (err, dish) => {
		res.json(dish);
	})
});

dishesRouter.post('', (req, res) => {
	var dish = new Dish(dish_params(req.body));
	dish.save((err, dishes) => {
		res.json(201,dish);
	})
});

dishesRouter.patch('/:id', (req, res) => {
	Dish.findOneAndUpdate({_id: req.params.id}, dish_params(req.body) ,(err, dish) => {
		res.json(dish)
	})
})

dishesRouter.delete('/:id', (req, res) => {
	Dish.findOneAndRemove({_id: req.params.id}, (err, dish) => {
		res.status(204).json(dish)
	})
})
function dish_params(body){
	return params(body).only(permittedParams)
}

module.exports = dishesRouter;
