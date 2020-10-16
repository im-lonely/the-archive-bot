import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "inventory",
  description: "Check your inventory",
  argsRequired: false,
  guildOnly: false,
  aliases: ["inv"],
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
    const target = message.mentions.users.first() || message.author;
    const user = await Users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();

    if (!items.length)
      return message.channel.send(`${target.tag} has nothing!`);

    const embed = new Discord.MessageEmbed()
      .setTitle(`${target.username}'s items:`)
      .setThumbnail(target.avatarURL()!)
      .setColor("RANDOM");

    let desc = "";

    for (const item of items) {
      desc += `\`${item.amount}\` ${item.item.dataValues.name}\n`;
    }

    embed.setDescription(desc);

    return message.channel.send(embed);
  },
} as Command;
