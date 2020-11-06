const AdminPassword = require("../models/AdminPassword");
const validateAdminPasswordInput = require("../validation/adminPassword");

exports.getPassword = async (req, res) => {
  try {
    const securityCode = req.params.adminPassword;

    const code = await AdminPassword.find({ securityCode });
    if (!code) {
      return res.status(404).json({
        success: false,
        error: "No Password found",
      });
    }
    return res.status(200).json({
      success: true,
      data: "hashed password",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not get admin password",
    });
  }
};
exports.createPassword = async (req, res) => {
  try {
    const { errors, isValid } = validateAdminPasswordInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    AdminPassword.findOne(
      {
        password: req.body.password,
      },
      async (err, result) => {
        if (result) {
          return res.status(400).json({
            success: true,
            message: "Sorry, the password already exists!",
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: "Server Error",
          });
        } else {
          const newPassword = await AdminPassword.create(req.body);

          return res.status(201).json({
            success: true,
            data: newPassword,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
