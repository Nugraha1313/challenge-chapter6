require("dotenv").config();
const Sequelize = require("sequelize");
const dbConfig = require('../external/database');

// Ambil konfigurasi yang sesuai berdasarkan environment
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Inisialisasi Sequelize dengan konfigurasi yang diberikan
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres'
    // tambahkan opsi tambahan di sini jika diperlukan
  }
);

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

const initModels = require("../models/init-models");
// const initModels = require("../models");

const {
  components,
  product_components,
} = initModels(sequelize);

// const Component = require("../models/components")(sequelize, Sequelize.DataTypes);
// const ProductComponent = require("../models/product_components")(sequelize, Sequelize.DataTypes);
// const Supplier = require("../models/supplier")(sequelize, Sequelize.DataTypes);

// const { components } = require("../models/components");

module.exports = {
  index: async (req, res, next) => {
    try {
      const allComponent = await components.findAll();

      return res.status(200).json({
        status: true,
        message: "Success get all Component",
        data: allComponent,
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const { component_id } = req.params;
      const selectedComponent = await components.findOne({
        where: {
          id: component_id,
        },
      });

      if (!selectedComponent) {
        return res.status(400).json({
          status: false,
          message: "Can't find Component with id " + component_id,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success get Component detail",
        data: selectedComponent,
      });
    } catch (err) {
      next(err);
    }
  },
  store: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          status: false,
          message: "name is required",
          data: null,
        });
      }
      let newComponent;

      if (!description) {
        newComponent = await components.create({
          name: name,
        });
      } else {
        newComponent = await components.create({
          name: name,
          description: description,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Success create new Component",
        data: newComponent,
      });
      // const { name, description } = req.body;

      // if (!name) {
      //   return res.status(400).json({
      //     status: false,
      //     message: "name is required",
      //     data: null,
      //   });
      // }
      // let newComponent;

      // if(!description) {
      //     newComponent = await Component.create({
      //       name: name
      //     });
      // }else {
      //     newComponent = await Component.create({
      //       name: name,
      //       description: description,
      //     });
      // }

      // return res.status(201).json({
      //   status: true,
      //   message: "Success create new Component",
      //   data: newComponent,
      // });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { component_id } = req.params;
      const component = await components.findOne({
        where: {
          id: component_id,
        },
      });

      const updated = await components.update(
        {
          name: req.body.name || component.name,
          description: req.body.description || component.description,
        },
        {
          where: {
            id: component_id,
          },
        }
      );

      if (updated[0] == 0) {
        return res.status(400).json({
          status: false,
          message: "Cant Find Component with id " + component_id,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Success update Component",
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { component_id } = req.params;
      const isComponentUsed = await product_components.findOne({
        where: {
          component_id: component_id,
        },
      });

      if (isComponentUsed) {
        return res.status(400).json({
          status: false,
          message: "Component is used in Product",
          data: null,
        });
      }

      const deleted = await components.destroy({
        where: {
          id: component_id,
        },
      });

      if (!deleted) {
        return res.status(400).json({
          status: false,
          message: "Cant Find Component with id " + component_id,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success delete Component with id " + component_id,
        data: deleted,
      });
      // const { component_id } = req.params;
      // const deleted = await Component.destroy({
      //   where: {
      //     id: component_id,
      //   },
      // });

      // if (!deleted) {
      //   return res.status(400).json({
      //     status: false,
      //     message: "Cant Find Component with id " + component_id,
      //     data: null,
      //   });
      // }

      // return res.status(200).json({
      //   status: true,
      //   message: "Success delete Component",
      //   data: deleted,
      // });
    } catch (err) {
      next(err);
    }
  },
};
