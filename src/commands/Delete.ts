import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "delete",
  description: "Delete a tag.",
  argsRequired: false,
  guildOnly: false,
  aliases: ["remove"],
  usage: "<name>",
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const tagName = commandArgs;
    const rowCount = await Tags.destroy({ where: { name: tagName } });
    if (!rowCount) return message.channel.send("That tag did not exist.");

    return message.channel.send("Tag deleted.");
  },
} as Command;
