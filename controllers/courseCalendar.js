const CourseCalendar = require("../models/CourseCalendar");
const Class = require("../models/Class");
const Booking = require("../models/Booking");
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

exports.createCourseCalendar = async (req, res) => {
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
    const courseId = req.params.id;
    const course = await CourseCalendar.findById(courseId);

    let courseClasses = [];
    let bookings;

    let counter = 0;
    const data = {};
    const classIds = [];
    const bookingIds = [];

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "No Course Calendar found",
      });
    }
    courseClasses = await Class.find({ courseCalendar_Id: courseId });
    data.courseClasses = courseClasses.length;
    if (courseClasses && courseClasses !== undefined) {
      courseClasses.map((courseClass) => classIds.push(courseClass._id));

      await Promise.all(
        courseClasses.map(async (classInfo) => {
          bookings = await Booking.find({ classId: classInfo._id });
          if (bookings.length > 0) counter++;
        })
      );
      data.classesBookings = counter;
      if (bookings && bookings !== undefined) {
        bookings.map((booking) => bookingIds.push(booking._id));
      }
    }

    if (classIds.length > 0) {
      await Promise.all(
        classIds.map(
          async (id) =>
            await Class.findByIdAndDelete(id, (err, result) => {
              if (err) console.log(err);
            })
        )
      );
    }
    if (bookingIds.length > 0) {
      await Promise.all(
        bookingIds.map(
          async (id) =>
            await Booking.findByIdAndDelete(id, (err, result) => {
              if (err) console.log(err);
            })
        )
      );
    }

    await course.remove();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
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
    const courseId = req.params.id;
    const query = { _id: courseId };
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
