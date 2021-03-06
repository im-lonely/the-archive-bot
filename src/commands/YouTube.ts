import Discord = require("discord.js");
import { Command } from "../Command";
const fetch = require("node-fetch");
const { youtubeSearch } = require("../config.json");

module.exports = {
  name: "youtube",
  description: "Search youtube",
  argsRequired: true,
  aliases: ["yt"],

  async execute(message, args, client) {
    const search = args.join(" ");

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(
        "search results",
        `[Youtube: ${search}](https://www.youtube.com/result?search_query=${encodeURIComponent(
          search
        )})`
      )
      .setFooter(client.user?.username)
      .setTimestamp(message.createdTimestamp);

    return message.channel.send(embed);
  },
} as Command;
