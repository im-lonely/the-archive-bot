import Discord = require("discord.js");
import { Command } from "../Command";

module.exports = {
  name: "list",
  description: "List all tags.",
  argsRequired: false,
  guildOnly: false,
  aliases: ["all"],
  cooldown: 1,
  async execute(message, args, client, commandArgs, Tags, currency) {
    const tagList = await Tags.findAll({ attributes: ["name"] });
    const listEmbed = new Discord.MessageEmbed();
    let fullList = "";
    for (let i = 0; i < tagList.length; i++)
      fullList += `\`${i}\`: ${tagList[i].name}\n`;
    listEmbed.setDescription(fullList);
    listEmbed.setColor("RANDOM");
    return message.channel.send(listEmbed);
  },
} as Command;
