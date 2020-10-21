import Discord = require("discord.js");
import { Command } from "../Command";
const getUsers = require("../getUsers");

module.exports = {
  name: "standoff",
  description: "It's hiiiiiiiiiiiggghhhhh noon",
  argsRequired: true,
  aliases: ["duel"],
  async execute(message, args, client) {
    const target: Discord.User = getUsers(args, client)[0];

    if (!target) return message.channel.send("User not found!");

    message.channel.send(
      ":flushed::point_right:           :point_left::flushed:",
      {
        embed: new Discord.MessageEmbed()
          .setColor("RANDOM")
          // .setDescription(
          //   `${message.author.username} is dueling ${target.username}!\nClick :point`
          // )
          .setDescription("This command is under development. Check back soon!")
          .setFooter(client.user?.tag),
      }
    );
  },
} as Command;
