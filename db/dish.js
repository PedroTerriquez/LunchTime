const db = require('../config/db.js')
var dishSchema = new db.Schema({
	name: String,
	description: String,
	ingredients: Array
})

var Dish = db.model('Dish', dishSchema)

module.exports = Dish;
