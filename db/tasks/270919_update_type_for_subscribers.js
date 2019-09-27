const Subscriber = require('../db/model/subscriber.js')
Subscriber.updateMany({}, {$set: {type: 'basicUser'}})
