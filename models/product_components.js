const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_components', {
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    component_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'components',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_components',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_components_pkey",
        unique: true,
        fields: [
          { name: "product_id" },
          { name: "component_id" },
        ]
      },
    ]
  });
};
