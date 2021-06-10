const express = require("express");
const router = express.Router();
const { validatePassword } = require("../controllers/authentication");

router.route("/login").post(validatePassword);

module.exports = router;
