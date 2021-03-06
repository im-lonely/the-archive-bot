import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "ban",
  description: "Ban someone",
  argsRequired: true,
  cooldown: 0,
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

      const reason = args.slice(1).join(" ");

      message.guild?.members.cache
        .get(target.id)
        ?.ban({
          reason: reason,
        })
        .then(() => {
          message.channel.send(
            new Discord.MessageEmbed()
              .addField(
                `Banned ${target.id}`,
                `Banned **${target.tag}** for \`${reason}\``
              )
              .setColor("RANDOM")
          );
        })
        .catch((err: any) => {
          console.log(err);
          return message.channel.send(`Couldn't ban **${target.tag}**!`);
        });

      target
        .send(
          new Discord.MessageEmbed()
            .setTitle("Ban")
            .setDescription(`You were banned from ${message.guild?.name}`)
            .addField("Reason", reason || "none")
            .setFooter(
              "Do not block me since if you get unbanned I will notify you."
            )
            .setColor("RANDOM")
        )
        .then(() => {
          message.channel.send(
            "I sent a notification to the user successfully."
          );
        })
        .catch((err) => {
          console.log(err);
          message.channel.send("I couldn't send a message to the user!");
        });

      const modlog: Discord.TextChannel = await modlogs.get(message.guild?.id);

      if (modlog)
        try {
          //@ts-ignore
          client.guilds.cache
            .get(modlog.guild.id)
            ?.channels.cache.get(modlog.id)
            // @ts-ignore
            .send(
              new Discord.MessageEmbed()
                .setTitle(`:hammer: Ban`)
                .setDescription(
                  `**${target.tag}** was banned by ${message.author.username}`
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
