require('dotenv').config();
const fs = require("fs");
const Discord = require('discord.js');
const { DefaultDeserializer } = require('v8');
const client = new Discord.Client();
const Token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();

client.cooldowns = new Discord.Collection();

// SubFolders in commands dir
const commandFolders = fs.readdirSync('./commands');


// JS Files in subFolders of commands dir
commandFolders.forEach((folder)=>{
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
  commandFiles.forEach((file)=>{
    // Individual command from file in subFolders
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  });
});
// console.log(client.commands);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // To Check if the command is there or not
  const command = client.commands.get(commandName) 
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // If no command then just return and do nothing
  if (!command) return;

  // To check that the message is guild only
  if (command.guildOnly && message.channel.type === 'dm') {
  	return message.reply('I can\'t execute that command inside DMs!');
  }


  // To check if the user has permission to execute the command
  if(command.permissions){
    const authorPerms = message.channel.permissionsFor(message.author);
    if(!authorPerms || !authorPerms.has(command.permissions)){
      return  message.reply('You cannot do this!');
    }
  }

  // To check that the message requires args or not
  if(command.args && !args.length){
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  // Checking the cooldown so that there is no spam
  const {cooldowns} = client;
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());  
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;   


  // Check if the user has cooldown or not
  if(timestamps.has(message.author.id)){
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if(now < expirationTime){
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before resuing the \`${command.name}\` command`);
    }
  }

  // After cooldown delete the cooldown for author
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // To execute the command
  try {
    command.execute(message, args);
  } catch (error) {  
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

client.login(Token);