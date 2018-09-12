const db = require('../config/db.js')
const menuSchema = new db.Schema({
	date: Date,
	dishes: [{ type: db.Schema.Types.ObjectId, ref: 'Dish' }],
	created_at: Date,
	updated_at: Date
})

const Menu = db.model('Menu', menuSchema)

module.exports = Menu;
