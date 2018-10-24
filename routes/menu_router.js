const Express = require('express');
const params = require('params');
const Menu = require('../db/model/menu.js');

const menuRouter = Express.Router();
const permittedParams = ['date', 'dishes'];

menuRouter.get('', (req, res) => {
	Menu
		.find({})
		.populate('dishes')
		.exec((err, menues) => {
		res.send(menues);
	})
});

menuRouter.get('/week', (req, res) => {
	range = range_for_this_week();
	console.log(range)
	Menu
		.find({
			date: {
				$gte: range[0],
				$lt: range[1]
			}
		})
		.populate('dishes')
		.exec((err, menu) => {
		res.json(menu);
	})
});

menuRouter.get('/month', (req, res) => {
	range = range_for_this_month();
	Menu
		.find({
			date: {
				$gte: range[0],
				$lt: range[1]
			}
		})
		.populate('dishes')
		.exec((err, menu) => {
		res.json(menu);
	})
});

menuRouter.get('/day/:date', (req, res) => {
	date = new Date(req.params.date).toISOString()
	Menu
		.findOne({date: date})
		.populate('dishes')
		.exec((err, menu) => {
		res.json(menu);
	})
});

menuRouter.post('', (req, res) => {
	var menu = new Menu(menu_params(req.body))
	menu.save((err, menu) => {
		res.status(201).json(menu);
	})
});

menuRouter.patch('/switch/:id', (req, res) => {
	const id = req.params.id
	const params = req.body
	Menu.findOne({ _id: id }).exec((err, menu) => {
		if (menu) {
			Menu.findOneAndUpdate({ date: params.date }, { date: null }).exec((err, menuTarget) => {
				let tempDate = menu.date
				menu.set({ date: params.date })
				menu.save((err, updatedMenu) => {
					if (menuTarget) {
						menuTarget.date = tempDate
						menuTarget.save((err, updatedTargetMenu) => {
							return res.status(201).json(menu);
						})
					} else {
						return res.status(201).json(menu);
					}
				})
			})
		}
	})
})

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

function range_for_this_month(){
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	firstDay = new Date(year, month, 1).toISOString();
	lastDay = new Date(year, month+1, 0).toISOString();
	return [firstDay, lastDay]
}

function range_for_this_week(){
  d = new Date()
  var day = d.getDay()
  var diff = d.getDate() - day + (day == 0 ? -6:1);
  date = new Date(d.setDate(diff));
  monday = new Date(date.getFullYear(), date.getMonth(), date.getDate()).setUTCHours(0,0,0,0)
  friday = new Date(d.setDate(diff + 5));
  return [monday, friday]
}

module.exports = menuRouter;
