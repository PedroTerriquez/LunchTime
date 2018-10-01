const db = require('../config/db.js')

const reviewSchema = new db.Schema({
	user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	rate: Number,
	comment: String,
	updated_at:  { type: Date, default: Date.now },
	created_at:  { type: Date, default: Date.now }
})

const dishSchema = new db.Schema({
	name: String,
	description: String,
	ingredients: Array,
	reviews: [reviewSchema],
	user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	created_at:  { type: Date, default: Date.now },
	updated_at:  { type: Date, default: Date.now }
})

const Dish = db.model('Dish', dishSchema)

module.exports = Dish;
