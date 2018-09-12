const Express = require('express');
const params = require('params');
const Menu = require('../db/menu.js');

const menuRouter = Express.Router();
const permittedParams = ['date', 'dishes'];

menuRouter.get('', (req, res) => {
	Menu.find({}, (err, menues) => {
		res.send(menues);
	})
});

menuRouter.get('/day/:date', (req, res) => {
	date = new Date(req.params.date).toISOString()
	Menu.findOne({date: date}).populate('dishes').exec((err, menu) => {
		res.json(menu);
	})
});

menuRouter.post('', (req, res) => {
	var menu = new Menu(menu_params(req.body));
	menu.save((err, menu) => {
		res.status(201).json(menu);
	})
});

menuRouter.patch('/:id', (req, res) => {
	Menu.findOneAndUpdate({_id: req.params.id}, menu_params(req.body) ,(err, menu) => {
		res.json(menu)
	})
})

menuRouter.delete('/:id', (req, res) => {
	Menu.findOneAndRemove({_id: req.params.id}, (err, menu) => {
		res.status(204).json(menu)
	})
})
function menu_params(body){
	return params(body).only(permittedParams)
}

module.exports = menuRouter;
