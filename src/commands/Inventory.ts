import Discord = require("discord.js");
import { Command } from "../Command";
const getUsers = require("../getUsers");
module.exports = {
  name: "inventory",
  description: "Check your inventory",
  argsRequired: false,
  aliases: ["inv"],
  async execute(message, args, client, commandArgs, Tags, currency, Users) {
    const target = getUsers(args, client)[0] || message.author;
    const user = await Users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();
    if (!target) return message.channel.send("User not found!");
    if (!items.length)
      return message.channel.send(`${target.tag} has nothing!`);
    const embed = new Discord.MessageEmbed()
      .setTitle(`${target.username}'s items:`)
      .setThumbnail(target.avatarURL()!)
      .setColor("RANDOM");
    let desc = "";
    for (const item of items)
      desc += `\`${item.amount}\` - ${item.item.dataValues.emoji} ${item.item.dataValues.name}\n`;
    embed.setDescription(desc);
    return message.channel.send(embed);
  },
} as Command;
