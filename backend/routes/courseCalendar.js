const express = require("express");
const router = express.Router();
const {
  getCoursesCalendar,
  addCourseCalendar,
  deleteCourseCalendar,
  updateCourseCalendar,
} = require("../controllers/courseCalendar");

router.route("/").get(getCoursesCalendar).post(addCourseCalendar);

router.route("/:id").delete(deleteCourseCalendar).put(updateCourseCalendar);

module.exports = router;
