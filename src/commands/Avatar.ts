import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "avatar",
  description: "Inspect someone's avatar",
  argsRequired: false,
  cooldown: 0,
  aliases: ["pfp"],
  async execute(message, args, client) {
    const target: Discord.User =
      client.users.cache.get(args[0])! ||
      message.mentions.users.first() ||
      message.author;

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(target.tag)
        .setTitle(`${target.username}'s avatar`)
        .setTimestamp(message.createdTimestamp)
        .setImage(target.displayAvatarURL({ dynamic: true }))
    );
  },
} as Command;
