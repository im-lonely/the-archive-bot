import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "prefix",
  description: "Check or change the prefix",
  argsRequired: false,
  cooldown: 1,
  async execute(
    message,
    args,
    client,
    commandArgs,
    Tags,
    currency,
    Users,
    CurrencyShop,
    prefixes,
    globalPrefix
  ) {
    if (message.member?.hasPermission("ADMINISTRATOR")) {
      if (args.length) {
        await prefixes.set(message.guild!.id, args[0]);
        return message.channel.send(
          `Successfully set prefix to \`${args[0]}\``
        );
      }

      return message.channel.send(
        `The prefix is \`${
          (await prefixes.get(message.guild!.id)) || globalPrefix
        }\``
      );
    } else {
      return message.channel.send("You don't have permission!");
    }
  },
} as Command;
