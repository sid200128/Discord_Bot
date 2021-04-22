module.exports = {
  name: 'set-avatar',
  description: 'Set Avatar for the Bot',
  args: true,
  usage: '<url>',
  execute(msg, args){
    msg.client.user.setAvatar(args[0]);
  }
}