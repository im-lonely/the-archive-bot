import { Command } from "../Command";
const pjson = require("./package.json");

module.exports = {
  name: "version",
  description: "Check the bot version",
  argsRequired: false,
  aliases: ["ver"],
  async execute(message) {
    message.channel.send(pjson.version);
  },
} as Command;
