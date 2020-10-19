import { Command } from "../Command";

module.exports = {
  name: "modlog",
  description: "Set the modlog",
  argsRequired: true,
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
    globalPrefix,
    modlogs
  ) {
    if (args) {
      if (message.guild) {
        if (message.member?.hasPermission("ADMINISTRATOR")) {
          await modlogs.set(
            message.guild?.id,
            message.mentions.channels.first()
          );
          return message.channel.send(
            `Modlog set to <#${message.guild?.channels.cache.get(
              message.mentions.channels.first()!.id
            )}>`
          );
        } else return message.channel.send("You don't have permission!");
      }
    } else {
      return message.channel.send(
        `Current modlog is set to <#${await modlogs.get(message.guild?.id)}>`
      );
    }
  },
} as Command;
