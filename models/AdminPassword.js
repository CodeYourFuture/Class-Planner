const mongoose = require("mongoose");

const AdminPasswordSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminPassword", AdminPasswordSchema);
