// require("dotenv").config();

// // const { body, validationResult } = require("express-validator");
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

// // const Supplier = require("../models/supplier")(sequelize, Sequelize.DataTypes);

// // const Component = require("../models/components")(
// //   sequelize,
// //   Sequelize.DataTypes
// // );

// // const ComponentSuppliers = require("../models/component_suppliers")(
// //   sequelize,
// //   Sequelize.DataTypes
// // );

// // const { Suppliers } = require("../models/Suppliers");

// module.exports = {
//   index: async (req, res, next) => {
//     try {
//       const allSupplier = await supplier.findAll();

//       return res.status(200).json({
//         status: true,
//         message: "Success get all Supplier",
//         data: allSupplier,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
//   show: async (req, res, next) => {
//     try {
//       const { supplier_id } = req.params;
//       const selectedSupplier = await supplier.findOne({
//         where: {
//           id: supplier_id,
//         },
//       });

//       if (!selectedSupplier) {
//         return res.status(400).json({
//           status: false,
//           message: "Can't find Supplier with id " + supplier_id,
//           data: null,
//         });
//       }

//       return res.status(200).json({
//         status: true,
//         message: "Success get Supplier detail",
//         data: selectedSupplier,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
//   store: async (req, res, next) => {
//     try {
//       const { name, address, component_id } = req.body;

//       if (!name) {
//         return res.status(400).json({
//           status: false,
//           message: "name is required",
//           data: null,
//         });
//       }

//       let newSupplier;

//       if (!address) {
//         newSupplier = await supplier.create({
//           name: name,
//         });

//         return res.status(201).json({
//           status: true,
//           message: "Success create new Supplier",
//           data: newSupplier,
//         });
//       } else if (component_id === 0 || !component_id) {
//         newSupplier = await supplier.create({
//           name: name,
//           address: address,
//         });

//         return res.status(201).json({
//           status: true,
//           message: "Success create new Supplier",
//           data: newSupplier,
//         });
//       }

//       // Validasi ID
//       // await body("component_id").isInt({ min: 1 }).run(req);
//       // const errors = validationResult(req);

//       // find component_id
//       const components_id = await components.findAll({
//         attributes: ["id"],
//       });

//       // check if channel_id is exist in channels_id
//       const isExist = components_id.find(
//         (component) => component.id == component_id
//       );

//       if (!isExist) {
//         return res.status(400).json({
//           status: false,
//           message: "Can't find component with id " + component_id,
//           data: null,
//         });
//       }

//       const addSupplier = await supplier.create({
//         name: name,
//         address: address,
//       });

//       const addComponentSuppliers = await component_suppliers.create({
//         component_id: component_id,
//         supplier_id: addSupplier.id,
//       });

//       return res.status(201).json({
//         status: true,
//         message: "Success create new Supplier",
//         data: [addSupplier, addComponentSuppliers],
//       });
//       // const { name, address } = req.body;

//       // if (!name) {
//       //   return res.status(400).json({
//       //     status: false,
//       //     message: "name is required",
//       //     data: null,
//       //   });
//       // }
//       // let newSupplier;

//       // if (!address) {
//       //   newSupplier = await Supplier.create({
//       //     name: name,
//       //   });
//       // } else {
//       //   newSupplier = await Supplier.create({
//       //     name: name,
//       //     address: address,
//       //   });
//       // }

//       // return res.status(201).json({
//       //   status: true,
//       //   message: "Success create new Supplier",
//       //   data: newSupplier,
//       // });
//     } catch (err) {
//       next(err);
//     }
//   },
//   update: async (req, res, next) => {
//     try {
//       const { supplier_id } = req.params;
//       const { name, address, component_id } = req.body;

//       const selectedSupplier = await supplier.findOne({
//         where: {
//           id: supplier_id,
//         },
//       });

//       if (!component_id || component_id === 0 || component_id == null) {
//         const updateSupplier = await supplier.update(
//           {
//             name: name || supplier.name,
//             address: address || supplier.address,
//           },
//           {
//             where: {
//               id: supplier_id,
//             },
//           }
//         );

//         if (updateSupplier[0] == 0) {
//           return res.status(400).json({
//             status: false,
//             message: "Cant Find Supplier with id " + supplier_id,
//             data: null,
//           });
//         }

//         return res.status(201).json({
//           status: true,
//           message: "Success update Supplier with id " + supplier_id,
//           data: updateSupplier,
//         });
//       }

//       // if component_id is filled
//       // find component_id
//       const components_id = await components.findAll({
//         attributes: ["id"],
//       });

//       // check if channel_id is exist in channels_id
//       const isExist = components_id.find(
//         (component) => component.id == component_id
//       );
//       if (!isExist) {
//         return res.status(400).json({
//           status: false,
//           message: "Can't find component with id " + component_id,
//           data: null,
//         });
//       }

//       const updateComponentSuppliers = await component_suppliers.update(
//         {
//           component_id: component_id,
//         },
//         {
//           where: {
//             supplier_id: supplier_id,
//           },
//         }
//       );

//       const updateSupplier = await supplier.update(
//         {
//           name: name || supplier.name,
//           address: address || supplier.address,
//         },
//         {
//           where: {
//             id: supplier_id,
//           },
//         }
//       );

//       if (updateSupplier[0] == 0) {
//         return res.status(400).json({
//           status: false,
//           message: "Cant Find Supplier with id " + supplier_id,
//           data: null,
//         });
//       }

//       return res.status(201).json({
//         status: true,
//         message: "Success update Supplier",
//         data: [updateSupplier, updateComponentSuppliers],
//       });
//       // const { supplier_id } = req.params;
//       // const updated = await Supplier.update(req.body, {
//       //   where: {
//       //     id: supplier_id,
//       //   },
//       // });

//       // if (updated[0] == 0) {
//       //   return res.status(404).json({
//       //     status: false,
//       //     message: "Cant Find Supplier with id " + supplier_id,
//       //     data: null,
//       //   });
//       // }

//       // return res.status(201).json({
//       //   status: true,
//       //   message: "Success update Supplier",
//       //   data: updated,
//       // });
//     } catch (err) {
//       next(err);
//     }
//   },
//   destroy: async (req, res, next) => {
//     try {
//       const { supplier_id } = req.params;

//       // check if supplier_id is used
//       const isUsed = await component_suppliers.findOne({
//         where: {
//           supplier_id: supplier_id,
//         },
//       });

//       if (isUsed) {
//         return res.status(400).json({
//           status: false,
//           message: "Supplier with id " + supplier_id + " is used",
//           data: null,
//         });
//       }

//       const deleted = await supplier.destroy({
//         where: {
//           id: supplier_id,
//         },
//       });

//       if (!deleted) {
//         return res.status(400).json({
//           status: false,
//           message: "Cant Find Supplier with id " + supplier_id,
//           data: null,
//         });
//       }

//       return res.status(200).json({
//         status: true,
//         message: "Success delete Supplier with id " + supplier_id,
//         data: deleted,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
// };
