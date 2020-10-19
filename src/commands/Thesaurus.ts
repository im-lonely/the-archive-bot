import { Command } from "../Command";
import Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "thesaurus",
  description: "Look stuff up on the thesaurus",
  argsRequired: true,

  aliases: ["synonym", "syn"],
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
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp);

    let synonyms = "";

    json[0].meanings.forEach((meaning: any) => {
      meaning.definitions.forEach((def: any) => {
        if (def.synonyms)
          def.synonyms.forEach((syn: any) => {
            synonyms += `${syn} \n`;
          });
      });
    });

    message.channel.send(embed);
  },
} as Command;
