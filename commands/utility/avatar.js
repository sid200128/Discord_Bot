module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp'],
  description: 'Avatar of the User',
  execute(msg, args){
    // If no mention then display avatar of author
    if(!msg.mentions.users.size) {
		  return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ dynamic: true })}>`);
		}

    // If user mentioned then display avatar of mentioned user
		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		msg.channel.send(avatarList);
  }
}