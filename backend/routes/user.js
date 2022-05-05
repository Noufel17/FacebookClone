const express = require("express");
const { regester } = require("../controllers/user");
const route = express.Router();

route.post("/regester", regester); // user regestration post request endpoint

module.exports = route;
