const jwt = require("jsonwebtoken");

exports.generateToken = (payload, timeToLeave) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: timeToLeave,
  });
};
