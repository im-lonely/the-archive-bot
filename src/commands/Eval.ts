import { Command } from "../Command";

module.exports = {
  name: "eval",
  description: "Run some JS. Only for [Cursors]",
  argsRequired: false,
  guildOnly: false,
  aliases: ["run"],
  usage: "<code>",
  cooldown: 1,
  async execute(
    message,
    args,
    client,
    commandArgs,
    Tags,
    currency,
    Users,
    CurrencyShop
  ) {
    if (message.author.id === "508442553754845184")
      return message.channel.send(eval(args.join(" ")));
  },
} as Command;
