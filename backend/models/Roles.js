const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, "Please add Role"],
  },
});

module.exports = mongoose.model("Role", RoleSchema);
