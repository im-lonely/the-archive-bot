import Discord = require("discord.js");

export type Command = {
  name: string;
  description: string;
  argsRequired: boolean;
  aliases?: Array<string>;
  execute(
    message: Discord.Message,
    args: Array<string>,
    client: Discord.Client,
    commandArgs: string,
    Tags?: any,
    currency?: any,
    Users?: any,
    CurrencyShop?: any,
    prefixes?: any,
    globalPrefix?: string,
    modlogs?: any
  ): any;
};
