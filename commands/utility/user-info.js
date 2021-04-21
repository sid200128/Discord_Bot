module.exports = {
  name: "user-info",
  description: "User info",
  execute(msg){
    msg.channel.send(`Your username: ${msg.author.username}\nYour id: ${msg.author.id}`);
  }
}