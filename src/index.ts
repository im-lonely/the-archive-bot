const fs = require("fs");
import Discord = require("discord.js");
import { Command } from "./Command";
import Sequelize = require("sequelize");
const { prefix, token } = require("./config.json");
const client: Discord.Client & any = new Discord.Client();
client.commands = new Discord.Collection<string, Command>();
const cooldowns = new Discord.Collection();
const { Users, CurrencyShop } = require("./dbObjects");
const { Op } = require("sequelize");
const currency = new Discord.Collection<any, any>();

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
  client.user.setActivity(` for ${prefix}help`, { type: "WATCHING" });
  const storedBalances = await Users.findAll();
  storedBalances.forEach((b: { user_id: any }) => currency.set(b.user_id, b));
  Tags.sync();
});

client.on("message", async (message: Discord.Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //@ts-ignore
  currency.add(message.author.id, 1);

  const input: Array<string> = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName = input.shift()!.toLowerCase();

  const commandArgs = input.join(" ");

  const command: Command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd: Command) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.argsRequired && !input.length) {
    let reply = `No arguments were provided!`;

    if (command.usage) {
      reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (command.guildOnly && message.channel.type === "dm") {
    return message.channel.send(`${command.name} can only be used in a guild!`);
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
    command.execute(message, input, client, commandArgs, Tags, currency);
  } catch (error) {
    console.error(error);
    message.channel.send(`Oops! Something went wrong with ${command.name}!`);
  }
});

client.login(token);
