import Discord = require("discord.js");
import { Command } from "../Command";
const getUsers = require("../getUsers");

module.exports = {
  name: "balance",
  description: "Check your balance",
  argsRequired: false,
  aliases: ["bal"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags, currency) {
    const target = getUsers(args, client)[0];

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
