const { Test } = require("../models/test.js");

module.exports = {
  store: async (req, res) => {
    try {
        const { title, body } = req.body;
        const data = await Test.create({
            title,
            body
        });

        return res.status(201).json({
            status: true,
            message:"data berhasil ditambahkan",
            data: data
        })
        
    } catch (error) {
      throw error;
    }
  },
};
