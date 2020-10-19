import { Command } from "../Command";
const ud = require("urban-dictionary");
import Discord = require("discord.js");

module.exports = {
  name: "urban",
  description: "Look stuff up on the urban dictionary",
  argsRequired: true,

  async execute(message, args, client) {
    const search = args.join(" ");

    ud.term(search, (error: any, entries: any, tags: any, sounds: any) => {
      if (error) {
        console.log(error.message);
        return message.channel.send("No results!");
      } else {
        const entry = entries[0];
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("search results")
            .addField(entry.word, entry.definition)
            .addField(
              "Votes",
              `:thumbsup: ${entry.thumbs_up} | :thumbsdown: ${entry.thumbs_down}`
            )
            .setDescription(entry.permalink)
            .setFooter("by " + entry.author)
        );
      }
    });
  },
} as Command;
