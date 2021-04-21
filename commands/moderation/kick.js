module.exports = {
  name: "kick",
  description: "Kick User",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  args: true,
  usage: "@user",
  execute(msg, args){
    if(!message.mentions.users.size){
		  return message.reply('you need to tag a user in order to kick them!');
		}
    const taggedUser = msg.mentions.users.first();
    msg.reply(`You wanted to kick: ${taggedUser}`);
  }
}