const Menu = require('../db/model/menu.js');

const Interactions = function Interactions() {
  this.reply = async function reply(interactionName, props) {
    if (this[interactionName] === 'undefined') {
      return 'Ay, no entiendo'
    }
    return this[interactionName](props);
  }

  this.askMenu = function askMenu(props) {
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
};

module.exports = new Interactions();
