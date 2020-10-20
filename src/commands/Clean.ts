import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "clean",
  aliases: ["clear"],
  description: "Clean messages",
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
    if (message.channel.type === "dm") return;
    if (message.member?.hasPermission("MANAGE_MESSAGES")) {
      const amount = Number(args[0]);

      if (Number.isNaN(amount) || !amount || amount === null)
        return message.channel.send("That's not a number.");

      if (amount < 2)
        return message.channel.send("Enter an amount greater than 1");

      const last100 = Math.floor(amount / 100);
      const leftOver = amount % 100;

      for (let i = 0; i < last100; i += 100)
        await message.channel.bulkDelete(100);

      await message.channel.bulkDelete(leftOver);

      message.channel.send(`I have deleted ${amount} messages!`);

      const reason = args.slice(1).join(" ");

      const modlog: Discord.TextChannel = await modlogs.get(message.guild?.id);

      if (modlog)
        try {
          //@ts-ignore
          client.guilds.cache
            //@ts-ignore
            .get(modlog.guild)
            ?.channels.cache.get(modlog.id)
            //@ts-ignore
            .send(
              new Discord.MessageEmbed()
                .setTitle(`:wastebasket: Cleansed`)
                .setDescription(
                  `**${message.author.username}** cleaned ${amount} messages in <#${message.channel.id}>`
                )
                .addField("Reason", reason || "none")
                .setTimestamp(message.createdTimestamp)
                .setColor("RANDOM")
            );
        } catch (e) {
          console.log(e);
        }
    } else return message.channel.send("You don't have permission!");
  },
} as Command;
