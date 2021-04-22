module.exports = {
  name: 'beep',
  description: 'Beep!',
  execute(msg, args) {
    msg.reply('boop');
    msg.channel.send('boop');
  },
};