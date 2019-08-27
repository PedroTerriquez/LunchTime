const Express = require('express');
const RobotOli = require('../robot-oli/robot-oli.js');
const DeclinedLunch = require('../db/model/declined_lunch.js')

const slackRouter = Express.Router();
const robotOli = new RobotOli();

slackRouter.post('', (req, res) => {
  const { event, challenge } = req.body;
  if (!event || event.subtype === 'bot_message') return res.send(challenge);

  const message = {
    user: event.user,
    text: event.text,
    channel: event.channel
  };

  robotOli.listen(message)
    .then(console.log)
    .catch(console.error)
    .finally(() => res.send(challenge));
});

slackRouter.post('/interactions', (req, res) => {
  const { type, callback_id, channel } = JSON.parse(req.body.payload)
  if (type == 'interactive_message' && callback_id == 'decline_lunch') {
    const params = { slack_id: channel.id }
    const declinedLunch = new DeclinedLunch(params);
    declinedLunch.save((err, declinedlunch) => {
      if (err) return res.sendStatus(500)

      return res.send({ attachments: [{ title: ':sadf: va, culo', color: 'warning' }] });
    });
  }
})

robotOli.runCronJobs();

module.exports = slackRouter;
