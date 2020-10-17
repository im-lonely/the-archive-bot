import Discord = require("discord.js");

module.exports = function getUsers(args: string[], client: Discord.Client) {
  const matches = [];

  console.log(args);

  for (const arg of args) {
    const match = arg.match(/\d{18}/)![0];
    if (match) matches.push(match);
  }

  if (!matches) return;

  return matches.map((id: string) => {
    if (client.users.cache.get(id)) return client.users.cache.get(id);
  });
};
