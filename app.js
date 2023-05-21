require('dotenv').config()
const express = require("express");
const app = express();
const port = 8000;

const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const cors = require("cors");

const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
const router = require("./routes");

app.use(morgan("dev"));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);

// 404
app.use((req, res, next) => {
  return res.status(404).json({
    message: "Not Found",
  });
});

// 500
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

//
// app.listen(port, () => console.log("Port " + port + " is running"));
module.exports = app
