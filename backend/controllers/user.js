const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");

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
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
