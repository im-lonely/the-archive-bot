import Discord = require("discord.js");
import { Command } from "../Command";
import fs = require("fs");

module.exports = {
  name: "updates",
  description: "Check for new updates",
  argsRequired: true,
  cooldown: 0,
  aliases: ["changelog"],
  execute(message) {
    fs.readFile(__dirname + "../CHANGELOG.md", (err, data) => {
      if (err) {
        console.log(err);
        return message.channel.send("Something went wrong!");
      }

      return message.channel.send(data || "Nothing new");
    });
  },
} as Command;
