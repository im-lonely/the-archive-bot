import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "balance",
  description: "Check your balance",
  argsRequired: false,
  guildOnly: false,
  aliases: ["bal"],
  usage: "[user]",
  cooldown: 1,
  async execute(
    message,
    args,
    client,
    commandArgs,
    Tags,
    currency,
    Users,
    CurrencyShop
  ) {
    const target: Discord.User | undefined =
      message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
      .addField(
        `${target!.username}`,
        `${currency.getBalance(target!.id)} coins`
      )
      .setThumbnail(target.avatarURL()!);

    return message.channel.send(embed);
  },
} as Command;
