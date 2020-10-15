import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "help",
  description: "Help yourself...",
  aliases: ["assist", "idk"],
  argsRequired: false,
  guildOnly: false,
  cooldown: 0,
  execute(message, args, client) {
    message.channel.send("https://im-lonely.github.io/the-archive-site/");
  },
} as Command;
