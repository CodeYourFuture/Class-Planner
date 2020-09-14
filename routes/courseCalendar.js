const express = require("express");
const router = express.Router();
const {
  getCoursesCalendar,
  createCourseCalendar,
  deleteCourseCalendar,
  updateCourseCalendar,
} = require("../controllers/courseCalendar");

router.route("/").get(getCoursesCalendar).post(createCourseCalendar);

router.route("/:id").delete(deleteCourseCalendar).put(updateCourseCalendar);

module.exports = router;
