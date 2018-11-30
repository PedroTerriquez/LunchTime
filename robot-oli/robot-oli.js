const { WebClient } = require('@slack/client');
const Skill = require('./skill.js');
const menuMemories = require('./menu-memories.js');
const Menu = require('../db/model/menu.js');

const RobotOli = (function (token) {
  return function RobotOli() {
    this.skill = new Skill(menuMemories);
    this.web = new WebClient(token);
  };
})(process.env.SLACK_TOKEN);

RobotOli.prototype.listen = async function listen(message) {
  return this.reply(message);
};

RobotOli.prototype.decode = function decode(text) {
  return new Promise((resolve, reject) => {
    const interaction = this.skill.findInteraction(text);
    if (interaction && interaction.model == 'menu') {
      Menu.find(interaction.values).populate('dishes').exec((err, menu) => {
        if (menu && menu[0]) {
          resolve(menu[0].human);
        } else {
          resolve("Aún no lo sé :sadf:")
        }
      });
    } else {
      resolve('Ay, no entiendo');
    }
  });
}

RobotOli.prototype.reply = async function reply(message) {
  this.decode(message.text).then(res => {
    return this.web.chat.postMessage({
      channel: message.channel,
      text: res
    });
  });
}

module.exports = RobotOli;
