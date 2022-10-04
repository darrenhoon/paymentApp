const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth-routes")

const app = express();

// require("dotenv").config();
// app.use(express.json());

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

// app.use((req, res, next) => {
//   res.status(404).json({message: "Could not find this route."})
// });

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || 'An unknown error occurred!' });
// });

// app.use("/api/register", register);
// app.use("/api/login", login);
app.use("/api", authRoutes);
// app.use("/api/stripe", stripe);

const uri = process.env.DB_URI;
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
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
