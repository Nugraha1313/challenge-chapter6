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
const {
  components,
  product_components,
  products,
  component_suppliers,
  supplier,
} = initModels(sequelize);

module.exports = {
  component: async () => {
    await components.bulkCreate([
      {
        name: "Kayu",
        description: "Merupakan Kayu",
      },
      {
        name: "Besi",
        description: "Merupakan Besi",
      },
      {
        name: "Tembaga",
        description: "Merupakan Tembaga",
      },
      {
        name: "Seng",
        description: "Merupakan Seng",
      },
      {
        name: "Fiber",
        description: "Merupakan Fiber",
      },
    ]);
  },
  product: async () => {
    await products.bulkCreate([
      {
        name: "Meja Kayu",
        quantity: 100,
      },
      {
        name: "Lemari Besi",
        quantity: 20,
      },
      {
        name: "Meja Tembaga",
        quantity: 10,
      },
      {
        name: "Meja Seng",
        quantity: 25,
      },
      {
        name: "Meja Fiber",
        quantity: 50,
      },
    ]);
  },
  suppliers: async () => {
    await supplier.bulkCreate([
      {
        name: "PT. Budi Kayu",
        address: "Jl. Kayu No. 1",
      },
      {
        name: "PT. Freya Besi",
        address: "JL. Besi No. 2",
      },
      {
        name: "PT. Tembaga Makmur Jaya",
        address: "Jl. Tembaga No. 3",
      },
      {
        name: "PT. Seng Sengaja",
        address: "JL. Rahmat wahyudi no. 4",
      },
      {
        name: "PT. Fiber Sentosa",
        address: "JL. Fiber no. 5",
      },
    ]);
  },
  productComponents: async () => {
    await product_components.bulkCreate([
      {
        product_id: 1,
        component_id: 1,
      },
      {
        product_id: 2,
        component_id: 2,
      },
      {
        product_id: 3,
        component_id: 3,
      },
      {
        product_id: 4,
        component_id: 4,
      },
      {
        product_id: 5,
        component_id: 5,
      },
    ]);
  },
  componentSuppliers: async () => {
    await component_suppliers.bulkCreate([
      {
        component_id: 1,
        supplier_id: 1,
      },
      {
        component_id: 2,
        supplier_id: 2,
      },
      {
        component_id: 3,
        supplier_id: 3,
      },
      {
        component_id: 4,
        supplier_id: 4,
      },
      {
        component_id: 5,
        supplier_id: 5,
      },
    ]);
  },
};
