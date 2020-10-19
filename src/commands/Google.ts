import Discord = require("discord.js");
import { Command } from "../Command";
const google = require("google");

module.exports = {
  name: "google",
  description: "Google something",
  argsRequired: true,
  aliases: ["lookup"],
  execute(message, args, client) {
    const search = args.join(" ");

    google(search, function (err: any, res: any) {
      if (err) message.channel.send("Couldn't connect!");

      const resultEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField("search results", `[Google: ${search}](${res.url})`)
        .setFooter(client.user?.username)
        .setTimestamp(message.createdTimestamp);

      return message.channel.send(resultEmbed);
    });
  },
} as Command;
