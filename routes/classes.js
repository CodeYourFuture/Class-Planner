const express = require("express");
const router = express.Router();
const {
  getClasses,
  createClass,
  deleteClass,
  updateClass,
} = require("../controllers/classes");

router.route("/").get(getClasses).post(createClass);

router.route("/:id").delete(deleteClass).put(updateClass);

module.exports = router;
