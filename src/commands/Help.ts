import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "help",
  description: "Help yourself...",
  argsRequired: false,
  guildOnly: false,
  aliases: ["assist"],
  cooldown: 0,
  execute(
    message,
    args,
    client,
    commandArgs,
    Tags,
    currency,
    Users,
    CurrencyShop
  ) {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle("Help")
      .setFooter("by [Cursors]#9257")
      .setDescription(
        "I'm a database for your server!\nTo get started using me, visit the website below"
      )
      .addField(
        "website",
        "https://im-lonely.github.io/the-archive-site/#/the-archive-site/",
        true
      )
      .setColor("RANDOM");
    message.channel.send(helpEmbed);
  },
} as Command;
