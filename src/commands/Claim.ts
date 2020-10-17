import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "claim",
  description: "Claim a tag.",
  argsRequired: true,
  aliases: ["steal"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const splitArgs = commandArgs.split(" ");
    const tagName = splitArgs.shift();

    if (!tagName) return message.channel.send("No tag name present!");

    const tag = await Tags.findOne({ where: { name: tagName } });

    if (
      tag.user_id !== message.author.id &&
      message.author.id !== "508442553754845184"
    )
      return message.channel.send("You don't own this tag!");
    else {
      const affectedRows = await Tags.update(
        { user_id: message.author.id },
        { where: { name: tagName } }
      );

      if (affectedRows > 0) {
        return message.channel.send(`Tag \`${tagName}\` was claimed by you.`);
      }
    }

    return message.channel.send(
      `Could not find a tag with name \`${tagName}\`.`
    );
  },
} as Command;
