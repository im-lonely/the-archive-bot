import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "transfer",
  description: "Transfer some coins.",
  argsRequired: true,
  guildOnly: false,
  aliases: ["give"],
  usage: "<user> <money>",
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
    const currentAmount = currency.getBalance(message.author.id);
    const transferAmount = commandArgs
      .split(/ +/g)
      .find((arg) => !/<@!?\d+>/g.test(arg));
    const transferTarget = message.mentions.users.first();

    if (!transferAmount || Number.isNaN(parseInt(transferAmount)))
      return message.channel.send(
        `Sorry ${message.author}, that's not a number.`
      );

    if (transferAmount > currentAmount)
      return message.channel.send(
        `Sorry ${message.author}, you only have ${currentAmount}.`
      );

    if (parseInt(transferAmount) <= 0)
      return message.channel.send(
        `Please enter an amount greater than zero, ${message.author}!`
      );

    currency.add(message.author.id, -transferAmount);
    currency.add(transferTarget!.id, transferAmount);

    return message.channel.send(
      `Transferred ${transferAmount} coins to ${
        transferTarget!.tag
      }. Your current balance is ${currency.getBalance(
        message.author.id
      )} coins!`
    );
  },
} as Command;
