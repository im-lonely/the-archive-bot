import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "shop",
  description: "Buy something",
  argsRequired: false,
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
    const items = await CurrencyShop.findAll();

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp)
      .setTitle("Shop");

    let shop = "";

    for (const item of items) {
      embed.addField(
        `${item.emoji} ${item.name} - ${item.cost}`,
        item.description
      );
    }

    embed.setDescription(shop);

    return message.channel.send(embed);
  },
} as Command;
