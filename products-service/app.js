const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const productsRoutes = require("./routes/products-routes")

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  next();
});

app.use("/api", productsRoutes);

module.exports = app;
