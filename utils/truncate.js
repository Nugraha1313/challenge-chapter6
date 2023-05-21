// const { User } = require("../db/models");
// module.exports = {
//   user: async () => {
//     await User.destroy({ truncate: true, restartIdentity: true });
//   },
//   post: async () => {
//     await Post.destroy({ truncate: true, restartIdentity: true });
//   },
// };

// require("dotenv").config();

// const { body, validationResult } = require("express-validator");
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   }
// );

// const initModels = require("../models/init-models");
// const { components, component_suppliers, supplier } = initModels(sequelize);

// module.exports = {
//   suppliers: async () => {
//     await supplier.destroy({ truncate: true, restartIdentity: true });
//   },
// };

require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const initModels = require("../models/init-models");
const { components, product_components, products, component_suppliers, supplier } = initModels(sequelize);


// const {
//   component_suppliers,
//   components,
//   product_components,
//   products,
//   supplier,
// } = require("../models/init-models");

module.exports = {
  component: async () => {
    await components.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
  componentSuppliers: async () => {
    await component_suppliers.destroy({ truncate: true, restartIdentity: true });
  },
  productComponents: async () => {
    await product_components.destroy({ truncate: true, restartIdentity: true });
  },
  product: async () => {
    await products.destroy({truncate: true, cascade: true, restartIdentity: true,
    });
  },
  suppliers: async () => {
    await supplier.destroy({truncate: true,cascade: true,restartIdentity: true,
    });
  },
};


