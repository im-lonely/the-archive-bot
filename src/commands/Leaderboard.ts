import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "leaderboard",
  description: "Check the leaderboard",
  argsRequired: false,
  aliases: ["top"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags, currency) {
    const people = currency
      .sort((a: any, b: any) => b.balance - a.balance)
      .filter((user: any) => client.users.cache.has(user.user_id))
      .first(5);

    let top = "";

    const emojis = [
      ":first_place:",
      ":second_place:",
      ":third_place:",
      ":medal:",
      ":medal:",
    ];

    people.forEach((person: any, i: number) => {
      top += `${emojis[i]} **${person.balance}** - ${
        client.users.cache.get(person.user_id)!.username
      }\n`;
    });

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp)
      .setTitle("Leaderboard")
      .setDescription(top);

    return message.channel.send(embed);
  },
} as Command;
