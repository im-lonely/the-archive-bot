import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "info",
  description: "Get info on a tag",
  argsRequired: true,
  aliases: ["taginfo"],
  cooldown: 0,
  async execute(message, args, client, commandArgs, Tags) {
    const tagName = commandArgs;

    const tag = await Tags.findOne({ where: { name: tagName } });

    const infoEmbed = new Discord.MessageEmbed()
      .setAuthor(`Owner: ${tag.username}`)
      .setDescription(`created at ${tag.createdAt}`)
      .addField("content", tag.description)
      .setFooter(`Used ${tag.usage_count} times.`)
      .setColor("RANDOM");

    if (tag) {
      return message.channel.send(infoEmbed);
    }

    return message.reply(`Could not find tag: \`${tagName}\``);
  },
} as Command;
