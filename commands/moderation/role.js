module.exports = {
  name: "role",
  description: "Role Related",
  args: true,
  usage: "<user> <role>",
  execute(msg, args){
    msg.reply(`You want to change the role of : ${args}`);
  }
}