import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "list",
  description: "List all tags.",
  argsRequired: false,
  guildOnly: false,
  aliases: ["all"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const tagList = await Tags.findAll({ attributes: ["name"] });
    const tagString =
      tagList.map((t: any) => t.name).join("\n") || "No tags set.";
    return message.channel.send(`List of tags:\n${tagString}`);
  },
} as Command;
