const Menu = require('../db/model/menu.js');
const Subscriber = require('../db/model/subscriber.js');

const Interactions = function Interactions() {
  this.reply = async function reply(interactionName, props, channel) {
    if (this[interactionName] === 'undefined') {
      return //'Ay, no entiendo'
    }
    return this[interactionName](props, channel);
  }

  this.askMenu = function askMenu(props) {
    console.log(props);
    return new Promise((resolve, reject) => {
      Menu.find(props).populate('dishes').exec((err, menu) => {
        if (menu && menu[0]) {
          resolve(menu[0].human);
        } else {
          resolve("Aún no lo sé :sadf:")
        }
      });
    });
  }

  this.theHorns = function theHorns() {
    return ':sign_of_the_horns:';
  }

  this.noYou = function noYou() {
    return 'La tuya perro :madf:';
  }

  this.menuSubscribe = function menuSubscribe(props, channel) {
    const params = {
      slack_id: channel
    };

    return new Promise((resolve, reject) => {
      Subscriber.findOneAndUpdate(params, params, { upsert: true, new: true, setDefaultsOnInsert: true }).exec((err, subscriber) => {
        if (err) return reject(err);

        resolve('Listo :drogof:');
      });
    })
  }

  this.menuUnsubscribe = function menuUnsubscribe(props, channel) {
    const params = {
      slack_id: channel
    };

    return new Promise((resolve, reject) => {
      Subscriber.findOneAndRemove(params).exec((err, subscriber) => {
        if (err) return reject(err);

        resolve('Okay :sadf:');
      })
    });
  }
};

module.exports = new Interactions();
