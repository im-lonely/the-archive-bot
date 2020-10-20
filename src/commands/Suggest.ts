import Discord = require("discord.js");
import { Command } from "../Command";
import fs = require("fs");

module.exports = {
  name: "suggest",
  description: "Suggest a feature",
  argsRequired: true,
  cooldown: 0,
  async execute(message, args) {
    let count = 0;
    fs.createReadStream(process.argv[2]).on("data", function (chunk: any) {
      for (let i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
    });

    if (count > 100)
      return message.channel.send(
        "Too many suggestions! Wait until the bot is updated!"
      );

    fs.writeFile(
      __dirname + "/../CHANGELOG.md",
      args.join(" ") + "\n",
      (err: any) => {
        if (err) console.log(err);
      }
    );
    return message.channel.send("Your suggestion was added!");
  },
} as Command;
