import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "ban",
  description: "Ban someone",
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
    if (message.member?.hasPermission("BAN_MEMBERS")) {
      const target: Discord.User =
        client.users.cache.get(args[0])! || message.mentions.users.first();

      if (!target) return message.channel.send("I couldn't find the user!");

      const days = parseInt(args[1]);

      if (!days || days === null)
        return message.channel.send("Please enter the days!");

      const reason = args.slice(2).join(" ");

      message.guild?.members.cache
        .get(target.id)
        ?.ban({
          reason: reason,
          days: days,
        })
        .then(() => {
          message.channel.send(
            new Discord.MessageEmbed()
              .addField(
                `Banned ${target.id}`,
                `Banned **${target.tag}** for \`${reason}\``
              )
              .setDescription(`Banned for ${days} days`)
              .setColor("RANDOM")
          );
        })
        .catch((err: any) => {
          console.log(err);
          return message.channel.send(`Couldn't ban **${target.tag}**!`);
        });

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
                .setTitle(`:timer: Tempban`)
                .setDescription(
                  `**${target.tag}** was tempbanned by ${message.author.username} for ${days} days`
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
