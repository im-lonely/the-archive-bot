import Discord = require("discord.js");
import { Command } from "../Command";
import fs = require("fs");

module.exports = {
  name: "suggest",
  description: "Suggest a feature",
  argsRequired: true,
  cooldown: 0,
  async execute(message, args) {
    let error;

    const suggestion = args.join(" ");

    fs.writeFile(
      __dirname + "/../CHANGELOG.txt",
      `${suggestion}\nby ${message.author.tag}\n\n`,
      { flag: "a" },
      (err: any) => {
        if (err) console.log(err);
        error = err;
      }
    );

    if (error) return message.channel.send("Something went wrong!");

    return message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(message.author.tag)
        .setColor("RANDOM")
        .setDescription("New suggestion added successfully!")
        .addField("Suggestion", `\`${suggestion}\``)
    );
  },
} as Command;
