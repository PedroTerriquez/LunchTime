const db = require('../../config/db.js')
const userSchema = new db.Schema({
	name: String,
	email: String,
	password: String,
	created_at:  { type: Date, default: Date.now },
	updated_at:  { type: Date, default: Date.now }
})

const User = db.model('User', userSchema)

module.exports = User;
