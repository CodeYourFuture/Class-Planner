const Class = require("../models/Class");
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

exports.addClass = async (req, res) => {
  try {
    const { errors, isValid } = validateClassInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const {
      date,
      status,
      className,
      startTime,
      endTime,
      scheduleType,
      syllabusURL,
    } = req.body;

    const newClass = await Class.create(req.body);

    return res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classToBeDeleted = await Class.findById(req.params.id);

    if (!classToBeDeleted) {
      return res.status(404).json({
        success: false,
        error: "No classToBeDeleted found",
      });
    }

    await classToBeDeleted.remove();

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

exports.updateClass = async (req, res) => {
  try {
    const classData = req.body;
    const { errors, isValid } = validateClassInput(classData);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const query = { _id: req.params.id };
    const classToBeUpdated = await Class.findOneAndUpdate(query, classData);
    if (!classToBeUpdated) {
      throw "classToBeUpdated not found!";
    }
    return res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: "Could not update classToBeUpdated",
    });
  }
};
