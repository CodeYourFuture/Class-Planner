const express = require("express");
const router = express.Router();
const {
  getPassword,
  createPassword,
} = require("../controllers/adminPassword");

router.route("/").post(createPassword);
router
  .route("/:id") 
  .put(getPassword) 

module.exports = router;
