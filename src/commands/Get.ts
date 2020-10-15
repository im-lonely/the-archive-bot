import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "get",
  description: "Retrieve a tag.",
  argsRequired: false,
  guildOnly: false,
  aliases: ["fetch", "gettag", "fetchtag"],
  usage: "<name>",
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const tagName = commandArgs;

    if (!tagName) message.channel.send("No tag was presented!");

    const tag = await Tags.findOne({ where: { name: tagName } });

    if (tag) {
      tag.increment("usageCount");
      return message.channel.send(tag.get("description"));
    }

    return message.channel.send(`Could not find the tag \`${tagName}\``);
  },
} as Command;
