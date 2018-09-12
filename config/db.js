var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lunchtime');

module.exports = mongoose;
