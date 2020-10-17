import { Command } from "../Command";
import Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dictionary",
  description: "Look stuff up on the dictionary",
  argsRequired: true,
  aliases: ["dict"],
  cooldown: 1,
  async execute(message, args, client) {
    const res: Response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        args[0]
      )}`
    );

    const json: any = await res.json();

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(json[0].word)
      .addField("phonetics", json[0].phonetics[0].text)
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp);

    json[0].meanings.forEach((meaning: any) => {
      embed.addField(meaning.partOfSpeech, meaning.definitions[0].definition);
    });

    message.channel.send(embed);
  },
} as Command;
