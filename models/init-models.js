let DataTypes = require("sequelize").DataTypes;
let _component_suppliers = require("./component_suppliers");
let _components = require("./components");
let _product_components = require("./product_components");
let _products = require("./products");
let _supplier = require("./supplier");

function initModels(sequelize) {
  let component_suppliers = _component_suppliers(sequelize, DataTypes);
  let components = _components(sequelize, DataTypes);
  let product_components = _product_components(sequelize, DataTypes);
  let products = _products(sequelize, DataTypes);
  let supplier = _supplier(sequelize, DataTypes);

  components.belongsToMany(products, { as: 'product_id_products', through: product_components, foreignKey: "component_id", otherKey: "product_id" });
  components.belongsToMany(supplier, { as: 'supplier_id_suppliers', through: component_suppliers, foreignKey: "component_id", otherKey: "supplier_id" });
  products.belongsToMany(components, { as: 'component_id_components_product_components', through: product_components, foreignKey: "product_id", otherKey: "component_id" });
  supplier.belongsToMany(components, { as: 'component_id_components', through: component_suppliers, foreignKey: "supplier_id", otherKey: "component_id" });
  component_suppliers.belongsTo(components, { as: "component", foreignKey: "component_id"});
  components.hasMany(component_suppliers, { as: "component_suppliers", foreignKey: "component_id"});
  product_components.belongsTo(components, { as: "component", foreignKey: "component_id"});
  components.hasMany(product_components, { as: "product_components", foreignKey: "component_id"});
  product_components.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_components, { as: "product_components", foreignKey: "product_id"});
  component_suppliers.belongsTo(supplier, { as: "supplier", foreignKey: "supplier_id"});
  supplier.hasMany(component_suppliers, { as: "component_suppliers", foreignKey: "supplier_id"});

  return {
    component_suppliers,
    components,
    product_components,
    products,
    supplier,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;