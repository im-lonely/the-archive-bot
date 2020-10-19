import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "transfer",
  description: "Transfer some coins.",
  argsRequired: true,
  aliases: ["give"],
  async execute(message, args, client, commandArgs, Tags, currency) {
    const currentAmount = currency.getBalance(message.author.id);

    const transferAmount = commandArgs
      .split(/ +/g)
      .find((arg) => !/<@!?\d+>/g.test(arg));

    const transferTarget = message.mentions.users.first();

    if (!transferTarget) return message.channel.send("User not found!");

    if (transferTarget!.id === message.author.id)
      return message.channel.send("Don't give money to yourself!");

    if (transferTarget?.bot)
      return message.channel.send(
        "Best not to give to my kind, we have no use for such abstract representations of currency."
      );

    if (!transferAmount || Number.isNaN(parseInt(transferAmount)))
      return message.channel.send(`Sorry, that's not a number.`);

    if (transferAmount > currentAmount)
      return message.channel.send(`Sorry, you only have ${currentAmount}.`);

    if (parseInt(transferAmount) <= 0)
      return message.channel.send(
        `Choose amount greater than zero, ${message.author}!`
      );

    currency.add(message.author.id, -transferAmount);
    currency.add(transferTarget!.id, transferAmount);

    return message.channel.send(
      `Transferred ${transferAmount} ${
        transferAmount === "1" ? "coin" : "coins"
      } to ${
        transferTarget!.tag
      }. Your current balance is ${currency.getBalance(
        message.author.id
      )} coins!`
    );
  },
} as Command;
