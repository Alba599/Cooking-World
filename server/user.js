const { request } = require("express");

const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("Users", user);
