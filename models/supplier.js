const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "supplier",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "supplier",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "supplier_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
