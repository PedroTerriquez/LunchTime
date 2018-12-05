const { WebClient } = require('@slack/client');
const Skill = require('./skill.js');
const interactions = require('./interactions.js');
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

RobotOli.prototype.decode = async function decode(text) {
  const interaction = this.skill.findInteraction(text);
  if (interaction) {
    return interactions.reply(interaction.name, interaction.values)
  }
  return 'Ay, no entiendo';
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
