const db = require('../config/db.js')
const userSchema = new db.Schema({
	name: String,
	email: String,
	created_at: Date,
	updated_at: Date
})

const User = db.model('User', userSchema)

module.exports = User;
