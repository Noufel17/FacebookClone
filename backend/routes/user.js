const express = require("express");
const { regester, activateAccount, login } = require("../controllers/user");
const route = express.Router();

route.post("/regester", regester); // user regestration post request endpoint
route.post("/activate", activateAccount);
route.post("/login", login);
module.exports = route;
