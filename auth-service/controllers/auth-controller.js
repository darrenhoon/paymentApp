const bcrypt = require("bcrypt");
// const { validationResult } = require("express-validator");
const Joi = require("joi");
// const express = require("express");
const { User } = require("../models/user");
const generateAuthToken = require("../utils/generateAuthToken");
// const router = express.Router();

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const token = generateAuthToken(user);

  res.send(token);
}

const signup = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  // console.log("here");

  const { name, email, password } = req.body;

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = generateAuthToken(user);

  res.send(token);
}

/*
router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const token = generateAuthToken(user);

  res.send(token);
});
*/


/*
router.post("/", async (req, res) => {

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json("Invalid inputs passed, please check your data.");
  //   return;
  // }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    res
      .status(503)
      .json(
        "Login in failed, likely due to network error. Please try again later."
      );
    return;
  }

  if (!existingUser) {
    res.status(401).json("No such account.");
    return;
  }

  try {
    comparisonResult = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
  } catch (error) {
    res.status(503).json("Error hashing the password at login");
    return;
  }

  if (!comparisonResult) {
    res.status(403).json("Wrong Password");
    return;
  }

  let jwtToken;
  try {
    jwtToken = jwt.sign(
      {
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_KEY,
      { expiresIn: '24h' } //30 seconds
    );
  } catch (err) {
    res
      .status(503)
      .json(
        "Something went wrong while trying create token for signed up user."
      );
    return;
  }

  // res.status(200).json({
  //   message: "Logged in!",
  //   user: existingUser,
  //   token: jwtToken,
  // });
  res.send(jwtToken)
});
*/

// module.exports = router;
exports.login = login;
exports.signup = signup;
