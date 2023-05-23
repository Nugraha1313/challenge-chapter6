// const { Test } = require('../models');

// module.exports = {
//   store: async (req, res, next) => {
//     try {
//       const { title, body } = req.body;
//       const data = await Test.create({
//         title,
//         body,
//       });

//       return res.status(201).json({
//         status: true,
//         message: "data berhasil ditambahkan",
//         data: data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
