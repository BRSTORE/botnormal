var mongoose = require("mongoose");

var UserSite = new mongoose.Schema({
  userID: String,
  server: Boolean,
  house: String,
  hasHouse: Boolean
});

module.exports = mongoose.model("UserSite", UserSite);
