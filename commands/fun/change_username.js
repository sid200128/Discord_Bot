module.exports = {
  name: 'change-username',
  description: 'Set Username for the Bot',
  args: true,
  usage: '<username>',
  execute(msg, args){
    msg.client.user.setUsername(args[0]);
  }
}