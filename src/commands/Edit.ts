import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "edit",
  description: "Edit a tag.",
  argsRequired: true,
  aliases: ["change", "edittag", "changetag"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const splitArgs = commandArgs.split(" ");
    const tagName = splitArgs.shift();
    const tagDescription = splitArgs.join(" ");

    if (!tagName) return message.channel.send("No tag name present!");

    if (!tagDescription)
      return message.channel.send("No edited content was specified!");

    const tag = await Tags.findOne({ where: { name: tagName } });

    if (
      tag.user_id !== message.author.id &&
      message.author.id !== "508442553754845184"
    )
      return message.channel.send("You don't own this tag!");
    else {
      const affectedRows = await Tags.update(
        { description: tagDescription },
        { where: { name: tagName } }
      );

      if (affectedRows > 0) {
        return message.channel.send(`Tag \`${tagName}\` was edited.`);
      }
    }

    return message.channel.send(
      `Could not find a tag with name \`${tagName}\`.`
    );
  },
} as Command;
