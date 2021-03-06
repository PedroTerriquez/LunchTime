const cronJob = require('node-cron')
const moment = require('moment')
const { WebClient } = require('@slack/client')
const Skill = require('./skill.js')
const interactions = require('./interactions.js')
const menuMemories = require('./menu-memories.js')
const Menu = require('../db/model/menu.js')
const Subscriber = require('../db/model/subscriber.js')

const RobotOli = (function (token) {
  return function RobotOli() {
    this.skill = new Skill(menuMemories);
    this.web = new WebClient(token);
  }
})(process.env.SLACK_TOKEN)

RobotOli.prototype.listen = async function listen(message) {
  return this.reply(message)
}

RobotOli.prototype.decode = async function decode(text, channel) {
  const interaction = this.skill.findInteraction(text)
  if (interaction) {
    return interactions.reply(interaction.name, interaction.values, channel)
  }
}

RobotOli.prototype.reply = async function reply(message) {
  this.decode(message.text, message.channel).then(res => {
    return this.web.chat.postMessage({
      channel: message.channel,
      ...res
    })
  })
}

RobotOli.prototype.sendMessage = async function sendMessage(message, channel) {
  return this.web.chat.postMessage({
    channel: channel,
    ...message
  })
}

RobotOli.prototype.runCronJobs = async function runCronJobs() {
  cronJob.schedule(process.env.SLACK_FIRST_REMINDER_TIME, async () => {
    const subscribers = await Subscriber.find()
    const today = moment().toDate().toISOString().replace(/T.*/, 'T00:00:00.000Z')
    const todayMenu = await interactions.askMenu({ date: today })
    todayMenu.attachments.push({
      title: 'Orden',
      callback_id: 'decline_lunch',
      color: 'good',
      actions: [
        {
          name: 'decline_lunch',
          text: 'No voy a comer aquí',
          style: 'danger',
          type: 'button',
          value: 'eating'
        }
      ]
    })
    subscribers.forEach(async subscriber => {
      this.sendMessage(todayMenu, subscriber.slack_id)
    })
  }, {
    timezone: 'America/Mexico_City'
  })

  cronJob.schedule(process.env.SLACK_LAST_REMINDER_TIME, async () => {
    const subscribers = await Subscriber.find()
    const today = moment().toDate().toISOString().replace(/T.*/, 'T00:00:00.000Z')
    const todayMenu = await interactions.askMenu({ date: today })
    subscribers.forEach(async subscriber => {
      this.sendMessage(todayMenu, subscriber.slack_id)
    })
  }, {
    timezone: 'America/Mexico_City'
  })
}

module.exports = RobotOli
