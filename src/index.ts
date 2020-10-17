const fs = require("fs");
import Discord = require("discord.js");
import { Command } from "./Command";
import Sequelize = require("sequelize");
import Keyv = require("keyv");
const { token } = require("./config.json");
const client: Discord.Client & any = new Discord.Client();
client.commands = new Discord.Collection<string, Command>();
const cooldowns = new Discord.Collection();
const { Users, CurrencyShop } = require("./dbObjects");
const { Op } = require("sequelize");
const currency = new Discord.Collection<any, any>();
const prefixes: Keyv = new Keyv();
const globalPrefix = "::";

prefixes.on("error", (err: any) =>
  console.error("Keyv connection error:", err)
);

const sequelize = new Sequelize.Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Tags = sequelize.define("tags", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: Sequelize.TEXT,
  username: Sequelize.STRING,
  user_id: Sequelize.STRING,
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

Reflect.defineProperty(currency, "add", {
  value: async function add(id: any, amount: any) {
    const user = currency.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    currency.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(currency, "getBalance", {
  value: function getBalance(id: any) {
    const user = currency.get(id);
    return user ? user.balance : 0;
  },
});

const commandFiles: Array<File> = fs
  .readdirSync(__dirname + "/commands")
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", async () => {
  console.log("Ready!");
  client.user.setStatus("online");
  client.user.setActivity(` for ${globalPrefix}help`, { type: "WATCHING" });
  const storedBalances = await Users.findAll();
  storedBalances.forEach((b: { user_id: any }) => currency.set(b.user_id, b));
  Tags.sync();
});

client.on("message", async (message: Discord.Message) => {
  if (message.author.bot) return;

  let args;

  if (message.guild) {
    let prefix;

    if (message.content.startsWith(globalPrefix)) {
      prefix = globalPrefix;
    } else {
      const guildPrefix = await prefixes.get(message.guild.id);
      if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    if (!prefix) return;

    args = message.content.slice(prefix.length).trim().split(/\s+/);

    //@ts-ignore
    currency.add(message.author.id, 1);

    if (!message.content.startsWith(prefix)) return;

    const commandName = args.shift()!.toLowerCase();

    const commandArgs = args.join(" ");

    const command: Command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd: Command) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.argsRequired && !args.length) {
      let reply = `No arguments were provided!`;

      return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now: number = Date.now();
    const timestamps: any = cooldowns.get(command.name);
    const cooldownAmount: number = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          `Please wait ${timeLeft.toFixed(1)} more second(s) before using \`${
            command.name
          }\`.`
        );
      }
    } else {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
      command.execute(
        message,
        args,
        client,
        commandArgs,
        Tags,
        currency,
        Users,
        CurrencyShop,
        prefixes,
        globalPrefix
      );
    } catch (error) {
      console.error(error);
      message.channel.send(`Oops! Something went wrong with ${command.name}!`);
    }
  } else message.channel.send("I am guild only!");
});

client.login(token);
