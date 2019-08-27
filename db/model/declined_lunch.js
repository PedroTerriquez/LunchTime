const db = require('../../config/db.js')

const declinedLunchSchema = new db.Schema({
  slack_id: { type: String, required: true },
  rejected_date: { type: Date, required: true, default: Date.now },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
})

declinedLunchSchema.pre('findOneAndUpdate', function (next) {
  this._update.updated_at = Date.now();
  next();
});

const DeclinedLunch = db.model('DeclinedLunch', declinedLunchSchema)

module.exports = DeclinedLunch

