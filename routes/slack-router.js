const Express = require('express');
const RobotOli = require('../robot-oli/robot-oli.js');

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

module.exports = slackRouter;
