const Class = require("../models/Class");
const Booking = require("../models/Booking");

const validateClassInput = require("../validation/class");

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    return res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { errors, isValid } = validateClassInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    Class.findOne(
      {
        courseCalendar_Id: req.body.courseCalendar_Id,
        date: req.body.date,
      },
      async (err, result) => {
        if (result) {
          return res.status(400).json({
            success: false,
            message: "Sorry, the class already exists!",
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: "Server Error",
          });
        } else {
          const newClass = await Class.create(req.body);

          return res.status(201).json({
            success: true,
            data: newClass,
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

exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const classToBeDeleted = await Class.findById(classId);

    if (!classToBeDeleted) {
      return res.status(404).json({
        success: false,
        error: "No class found",
      });
    }

    await Booking.deleteMany({ classId }, async (err, result) => {
      if (result) { 
        await classToBeDeleted.remove();
        return res.status(200).json({
          success: true,
          data: {},
        });
      } else if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: "Server Error",
        });
      } else {
        await classToBeDeleted.remove();
        return res.status(404).json({
          success: false,
          error: "No booking for class found",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const error = {};
    error.message = "Could not update class";
    const classData = req.body;
    const { errors, isValid } = validateClassInput(classData);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    const classId = req.params.id;
    const query = { _id: classId };
    const newClass = await Class.findOneAndUpdate(query, classData);
    if (!newClass) {
      return res.status(400).json(error);
    }
    return res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      data: error,
    });
  }
};
