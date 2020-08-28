const CourseCalendar = require("../models/CourseCalendar");
const validateCourseCalendarInput = require("../validation/courseCalendar");

exports.getCoursesCalendar = async (req, res) => {
  try {
    const coursesCalendar = await CourseCalendar.find();

    return res.status(200).json({
      success: true,
      count: coursesCalendar.length,
      data: coursesCalendar,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addCourseCalendar = async (req, res) => {
  try {
    const { errors, isValid } = validateCourseCalendarInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCourseCalendar = await CourseCalendar.create(req.body);

    return res.status(201).json({
      success: true,
      data: newCourseCalendar,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteCourseCalendar = async (req, res) => {
  try {
    const courseCalendar = await CourseCalendar.findById(req.params.id);

    if (!courseCalendar) {
      return res.status(404).json({
        success: false,
        error: "No Course Calendar found",
      });
    }

    await courseCalendar.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateCourseCalendar = async (req, res) => {
  try {
    const { errors, isValid } = validateCourseCalendarInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const query = { _id: req.params.id };
    const courseCalendar = await CourseCalendar.findOneAndUpdate(
      query,
      req.body
    );
    if (!courseCalendar) {
      return res.status(404).json({
        success: false,
        error: "No Course Calendar found",
      });
    }
    return res.status(200).json({
      success: true,
      data: req.body,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not update Course Calendar",
    });
  }
};
