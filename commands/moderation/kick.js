module.exports = {
  name: "kick",
  description: "Kick User",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  args: true,
  usage: "@user",
  execute(msg, args){
    if(!msg.mentions.users.size){
		  return msg.reply('you need to tag a user in order to kick them!');
		}
    const taggedUser = msg.mentions.members.first();
    msg.reply(`Kicked User: ${taggedUser.username}`);
    taggedUser.kick();
  }
}