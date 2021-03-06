const db = require('../../config/db.js')

const reviewSchema = new db.Schema({
	user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	stars: Number,
	comment: String,
	updated_at:  { type: Date, default: Date.now },
	created_at:  { type: Date, default: Date.now }
})

const dishSchema = new db.Schema({
	name: String,
	description: String,
	ingredients: Array,
	type: String,
	image: String,
	reviews: [reviewSchema],
	user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	created_at:  { type: Date, default: Date.now },
	updated_at:  { type: Date, default: Date.now },
  slug: String
})

const Dish = db.model('Dish', dishSchema)

module.exports = Dish;
