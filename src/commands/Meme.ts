import Discord = require("discord.js");
import { Command } from "../Command";
const fetch = require("node-fetch");
const canvas = require("canvas");

module.exports = {
  name: "meme",
  description: "Sends a meme",
  argsRequired: false,
  async execute(message, args, client) {
    const res = await fetch(
      "https://www.reddit.com/r/dankmemes/hot/.json?limit=100"
    );
    const json = await res.json();

    if (!json)
      return message.channel.send(
        "Try again in a few seconds, we're having connectivity issues."
      );

    const post = json.data.children[Math.floor(Math.random() * 100)].data;

    console.log(post);

    return message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(`${post.author} | ${post.ups} upvotes`)
        .setColor("RANDOM")
        .setDescription("This command is under development. Check back soon!")
        .setTitle(post.title.replace(/[“”]/gi, ""))
    );
  },
} as Command;
