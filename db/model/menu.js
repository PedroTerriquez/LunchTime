const db = require('../../config/db.js')
const menuSchema = new db.Schema({
	date: { type: Date, unique: true },
	dishes: [{ type: db.Schema.Types.ObjectId, ref: 'Dish' }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

menuSchema.virtual('human').get(function() {
  return this.dishes.map(dish => dish.name).join(', ')
})

menuSchema.virtual('image').get(function() {
  const mainDish = this.dishes.find(dish => dish.type == 'Main Dish')
  if (mainDish) return mainDish.image
})

const Menu = db.model('Menu', menuSchema)

module.exports = Menu;
