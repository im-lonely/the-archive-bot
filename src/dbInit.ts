import Sequelize = require("sequelize");

const sequelize = new Sequelize.Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop")(
  sequelize,
  Sequelize.DataTypes
);
require("./models/Users")(sequelize, Sequelize.DataTypes);
require("./models/UserItems")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    const shop = [
      CurrencyShop.upsert({
        emoji: "🍵 ",
        name: "Tea",
        cost: 10,
        description: "Enjoy some tea with some Brits. *sip*",
      }),
      CurrencyShop.upsert({
        emoji: "☕",
        name: "Coffee",
        cost: 12,
        description: "*Wakey wakey!* Time for work on monday...",
      }),
      CurrencyShop.upsert({
        emoji: "🍰",
        name: "Cake",
        cost: 20,
        description: "It's not your birthday, you can't b- No, don't buy it!",
      }),
      CurrencyShop.upsert({
        emoji: "🍜",
        name: "Instant Noodles",
        cost: 15,
        description: "You can taste it already, can't you?",
      }),
    ];
    await Promise.all(shop);
    console.log("Database synced");
    sequelize.close();
  })
  .catch(console.error);
