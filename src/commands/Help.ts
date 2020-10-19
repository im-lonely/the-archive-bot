import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "help",
  description: "Help yourself...",
  argsRequired: false,
  aliases: ["assist"],
  execute(message, args, client, CurrencyShop) {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle("Help")
      .setFooter("by [Cursors]#9257")
      .setDescription(
        "I'm a database for your server!\nTo get started using me, visit the website below"
      )
      .addField(
        "website",
        "https://im-lonely.github.io/the-archive-site/#/the-archive-site/"
      )
      .addField(
        "docs",
        "https://im-lonely.github.io/the-archive-site/#/the-archive-site/docs"
      )
      .setColor("RANDOM");
    message.channel.send(helpEmbed);
  },
} as Command;
