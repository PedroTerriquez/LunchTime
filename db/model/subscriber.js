const db = require('../../config/db.js')

const subscriberSchema = new db.Schema({
  slack_id: { type: String, unique: true, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
})

subscriberSchema.pre('findOneAndUpdate', function (next) {
  this._update.updated_at = Date.now();
  next();
});

const Subscriber = db.model('Subscriber', subscriberSchema)

module.exports = Subscriber
