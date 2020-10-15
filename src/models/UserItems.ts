module.exports = (sequelize: any, DataTypes: any) => {
  return sequelize.define(
    "user_item",
    {
      user_id: DataTypes.STRING,
      item_id: DataTypes.STRING,
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
