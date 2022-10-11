const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth-routes")

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

app.use("/api", authRoutes);

const uri = process.env.DB_URI;
console.log(uri)
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!")
  })
  .catch((err) => {
    console.log("Failed to log into MongoDB Atlas. Error below.")
    console.error(err)
  });

module.exports = app;
