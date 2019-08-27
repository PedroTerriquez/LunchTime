const Express = require('express');
const params = require('params');
const Dish = require('../db/model/dish.js');
const SlugGenerator = require('../lib/slug-generator.js');

const slugGenerator = new SlugGenerator(Dish, 'slug');
const dishesRouter = Express.Router();
const permittedParams = ['_id', 'name', 'image', 'type', 'description', 'ingredients'];
const reviewPermittedParams = ['user', 'stars', 'comment','_id'];

dishesRouter.get('', (req, res) => {
  let query = {
    name: req.query.name ? new RegExp(req.query.name, 'i') : ''
  }
  if (query.name === '') { query = {} }
	Dish.find(query, (err, dishes) => {
		res.send(dishes);
	})
});

dishesRouter.get('/:id', (req, res) => {
	Dish
		.findOne({_id: req.params.id})
		.populate('reviews.user')
		.exec((err, dish) => {
		res.json(dish);
		})
});

dishesRouter.get('/name/:slug', (req, res) => {
	Dish
		.findOne({ slug: req.params.slug })
		.populate('reviews.user')
		.exec((err, dish) => {
		  res.json(dish);
		});
});

dishesRouter.post('', (req, res) => {
  const dishParams = dish_params(req.body);
  slugGenerator.createSlug(dishParams.name).then(slug => {
    dishParams.slug = slug;
    var dish = new Dish(dishParams);
    dish.save((err, dishes) => {
      return res.json(201, dish);
    });
  }).catch(err => res.json(500, err));
});

dishesRouter.patch('/:id', (req, res) => {
	Dish.findOneAndUpdate({_id: req.params.id}, dish_params(req.body) ,(err, dish) => {
		res.json(dish)
	})
})

dishesRouter.post('/:id/reviews', (req, res) => {
	Dish.findOne({_id: req.params.id} ,(err, dish) => {
		dish.reviews.push(review_params(req.body));
		dish.save((err, dish) => res.status(201).json(dish));
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

function review_params(body){
	return params(body).only(reviewPermittedParams)
}

module.exports = dishesRouter;
