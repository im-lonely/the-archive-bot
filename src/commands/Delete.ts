import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "delete",
  description: "Delete a tag.",
  argsRequired: true,
  aliases: ["remove"],
  async execute(message, args, client, commandArgs, Tags) {
    const tagName = commandArgs;

    const tag = await Tags.findOne({ where: { name: tagName } });

    if (!tag) return message.channel.send("No tag was specified!");

    if (
      tag.user_id !== message.author.id &&
      message.author.id !== "508442553754845184"
    )
      return message.channel.send("You don't own this tag!");
    else {
      const rowCount = await Tags.destroy({ where: { name: tagName } });
      if (!rowCount) return message.channel.send("That tag did not exist.");

      return message.channel.send("Tag deleted.");
    }
  },
} as Command;
