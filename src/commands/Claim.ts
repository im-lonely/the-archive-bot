import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "claim",
  description: "Claim a tag.",
  argsRequired: false,
  guildOnly: false,
  aliases: ["steal"],
  usage: "<name>",
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags) {
    const splitArgs = commandArgs.split(" ");
    const tagName = splitArgs.shift();

    if (!tagName) return message.channel.send("No tag name present!");

    //TODO: IMPLEMENT USER AUTHENTICATION

    const affectedRows = await Tags.update(
      { id: message.author.id },
      { where: { name: tagName } }
    );

    if (affectedRows > 0) {
      return message.channel.send(`Tag \`${tagName}\` was claimed by you.`);
    }

    return message.channel.send(
      `Could not find a tag with name \`${tagName}\`.`
    );
  },
} as Command;
