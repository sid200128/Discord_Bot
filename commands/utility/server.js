module.exports = {
  name: 'server',
  description: "Server Info",
  execute(msg, arg) {
    msg.channel.send(`Server Name: ${msg.guild.name}\nTotal Members: ${msg.guild.memberCount}`);
  },
};