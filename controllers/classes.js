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
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    const newClass = await Class.create(req.body);

    return res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (err) {
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
