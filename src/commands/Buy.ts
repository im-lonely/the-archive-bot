import Discord = require("discord.js");
const { Op } = require("sequelize");
import { Command } from "../Command";

module.exports = {
  name: "buy",
  description: "Buy something",
  argsRequired: true,
  aliases: ["purchase"],
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
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: commandArgs } },
    });

    if (!item) return message.channel.send(`That item doesn't exist.`);

    if (item.cost > currency.getBalance(message.author.id)) {
      return message.channel.send(
        `You currently have ${currency.getBalance(
          message.author.id
        )}, but the ${item.name} costs ${item.cost}!`
      );
    }

    const user = await Users.findOne({ where: { user_id: message.author.id } });
    currency.add(message.author.id, -item.cost);
    await user.addItem(item);

    message.channel.send(`You've bought: ${item.name}.`);
  },
} as Command;
