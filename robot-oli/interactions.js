const Menu = require('../db/model/menu.js')
const Subscriber = require('../db/model/subscriber.js')

const Interactions = function Interactions() {
  this.reply = async function reply(interactionName, props, channel) {
    if (this[interactionName] !== 'undefined') {
      return this[interactionName](props, channel)
    }
  }

  this.askMenu = function askMenu(props) {
    return new Promise((resolve, reject) => {
      Menu.find(props).populate('dishes').exec((err, menu) => {
        if (menu && menu[0]) {
          resolve({
            attachments: [
              {
                title: menu[0].human,
                image_url: menu[0].image,
                color: 'good'
              }
            ]
          });
        } else {
          resolve({ attachments: [{ title: ':sadf: Aún no lo sé', color: 'warning' }] })
        }
      });
    });
  }

  this.theHorns = function theHorns() {
    return { attachments: [{ title: ':sign_of_the_horns:', color: 'good' }] }
  }

  this.noYou = function noYou() {
    return { attachments: [{ title: ':madf: La tuya perro', color: 'danger' }] }
  }

  this.menuSubscribe = function menuSubscribe(props, channel) {
    const params = {
      slack_id: channel
    };

    return new Promise((resolve, reject) => {
      Subscriber.findOneAndUpdate(params, params, { upsert: true, new: true, setDefaultsOnInsert: true }).exec((err, subscriber) => {
        if (err) return reject(err);

        resolve({ attachments: [{ title: ':drogof: Listo', color: 'good' }] });
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

        resolve({ attachments: [{ title: ':sadf: Okay', color: 'warning' }] });
      })
    });
  }
};

module.exports = new Interactions();
