const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('component_suppliers', {
    component_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'components',
        key: 'id'
      }
    },
    supplier_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'supplier',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'component_suppliers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "component_suppliers_pkey",
        unique: true,
        fields: [
          { name: "component_id" },
          { name: "supplier_id" },
        ]
      },
    ]
  });
};
