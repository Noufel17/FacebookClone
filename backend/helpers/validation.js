// here we write functions that validate user data
const User = require("../models/User");
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (str, min, max) => {
  return !(str.length > max || str.length < min);
};

exports.validateUsername = async (username) => {
  let continu = false;
  do {
    let found = await User.findOne({ username });
    if (found) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      continu = true;
    } else {
      continu = false;
    }
  } while (continu);
  return username;
};
