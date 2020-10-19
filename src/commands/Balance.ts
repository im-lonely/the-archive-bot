import Discord = require("discord.js");
import { Command } from "../Command";
const getUsers = require("../getUsers");

module.exports = {
  name: "balance",
  description: "Check your balance",
  argsRequired: false,
  aliases: ["bal"],
  async execute(message, args, client, commandArgs, Tags, currency) {
    const target = getUsers(args, client)[0] || message.author;

    if (!target) return message.channel.send("User not found!");

    const embed = new Discord.MessageEmbed()
      .addField(
        `${target!.username}`,
        `${currency.getBalance(target!.id)} coins`
      )
      .setThumbnail(target.avatarURL()!)
      .setColor("RANDOM");

    return message.channel.send(embed);
  },
} as Command;
