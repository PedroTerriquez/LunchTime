const db = require('../config/db.js')
const menuSchema = new db.Schema({
	date: { type: Date, unique: true },
	dishes: [{ type: db.Schema.Types.ObjectId, ref: 'Dish' }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

const Menu = db.model('Menu', menuSchema)

module.exports = Menu;
