import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "new",
  description: "Create a new tag.",
  argsRequired: true,
  aliases: ["create", "newtag", "createtag"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const splitArgs = commandArgs.split(" ");
    const tagName = splitArgs.shift();
    const tagDescription = splitArgs.join(" ");

    if (!tagName) return message.channel.send("No tag name was specified.");

    if (!tagDescription)
      return message.channel.send("No content was specfied.");

    try {
      const tag = await Tags.create({
        name: tagName,
        description: tagDescription,
        username: message.author.username,
        user_id: message.author.id,
      });
      return message.channel.send(`Tag \`${tag.name}\` added.`);
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError")
        return message.channel.send("That tag already exists.");
      return message.channel.send("Something went wrong with adding a tag.");
    }
  },
} as Command;
