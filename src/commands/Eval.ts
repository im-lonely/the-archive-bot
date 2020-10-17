import { Command } from "../Command";

module.exports = {
  name: "eval",
  description: "Run some JS. Only for [Cursors]",
  argsRequired: true,
  aliases: ["run"],
  cooldown: 1,
  async execute(message, args) {
    if (message.author.id === "508442553754845184")
      return message.channel.send(eval(args.join(" ")));
  },
} as Command;
