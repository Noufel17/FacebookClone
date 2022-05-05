const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");

exports.regester = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      birthyear,
      birthmonth,
      birthday,
    } = req.body;
    // verifying attributes validity
    // verifying email
    if (!validateEmail(email)) {
      // return error response without checking anything else or saving
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const found = await User.findOne({ email });
    if (found) {
      // return with error response without saving
      return res.status(400).json({
        message: "email address already used",
      });
    }
    // verifying lengths
    if (!validateLength(first_name, 3, 25)) {
      return res.status(400).json({
        message: "first name must be between 3 and 25 caracters",
      });
    }
    if (!validateLength(last_name, 3, 25)) {
      return res.status(400).json({
        message: "last name must be between 3 and 25 caracters",
      });
    }
    if (!validateLength(password, 8, 50)) {
      return res.status(400).json({
        message: "first name must be between 8 and 50 caracters",
      });
    }
    // password encryption
    const cryptedPassword = await bcrypt.hash(password, 12);
    // username validation
    let tempUsername = first_name + last_name;
    const newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      gender,
      birthyear,
      birthmonth,
      birthday,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verfied: user.verfied,
      message:
        "regestration success ! please activate your account through the mail",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // internal server error
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.PRIVATE_KEY);
    const found = await User.findById(user.id);
    if (found.verified === true) {
      res.status(400).json({ message: "this account is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      res.status(200).json({ message: "account activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); //internel server error
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "this email is not connected to any account",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "the password is wrong",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verfied: user.verfied,
      message: "login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); //internel server error
  }
};
