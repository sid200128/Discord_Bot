module.exports = {
  name: "role",
  description: "Role Related",
  args: true,
  usage: "<operation(add/remove)> <user> <role>",
  execute(msg, args){
    if(args.length < 3){
      return msg.reply("Check usage of the command");
    }
    const operation = args[0].toLowerCase();
    const assignRole = args[2].toLowerCase();
    const role = msg.guild.roles.cache.find(role => role.name===assignRole);
    const member = msg.mentions.members.first();
    if(operation === "add"){
      member.roles.add(role);
    } else if(operation === "remove"){
      member.roles.remove(role);
    } else {
      msg.reply("Check usage of the command");
    }
  }
}