import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "get",
  description: "Retrieve a tag.",
  argsRequired: true,
  aliases: ["fetch", "gettag", "fetchtag"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const tagName = commandArgs;

    if (!tagName) message.channel.send("No tag was presented!");

    const tag = await Tags.findOne({ where: { name: tagName } });

    if (tag) {
      tag.increment("usage_count");
      return message.channel.send(tag.get("description"));
    }

    return message.channel.send(`Could not find the tag \`${tagName}\``);
  },
} as Command;
