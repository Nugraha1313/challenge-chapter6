'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComponentSupplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ComponentSupplier.init(
    {
      component_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ComponentSupplier",
      timestamps: false,
    }
  );
  return ComponentSupplier;
};