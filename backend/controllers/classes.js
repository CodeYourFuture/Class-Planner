const Class = require("../models/Class");

// @desc    Get all classes
// @route   GET /api/v1/classes
// @access  Public
exports.getClasses = async (req, res, next) => {
    try {
        const classes = await Class.find();
    
        return res.status(200).json({
          success: true,
          count: classes.length,
          data: classes
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
};

// @desc    Add class
// @route   POST /api/v1/classes
// @access  Public
exports.addClass = async (req, res, next) => {
  try {
    const {
      className,
      bookingDate,
      moduleName,
      status,
      statusMessage,
      syllabusUrl,
      schedule,
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

// @desc    Delete class
// @route   DELETE /api/v1/classes/:id
// @access  Public
exports.deleteClass = async (req, res, next) => {
    try {
        const classToBeDeleted = await Class.findById(req.params.id);
    
        if(!classToBeDeleted) {
          return res.status(404).json({
            success: false,
            error: 'No classToBeDeleted found'
          });
        }
    
        await classToBeDeleted.remove();
    
        return res.status(204).json({
          success: true,
          data: {}
        });
    
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
};

// @desc    Update class
// @route   Update /api/v1/classes/:id
// @access  Public
exports.updateClass = async (req, res, next) => {
  res.json({
    status: "success",
    message: "UPDATE CLASS",
  });
};
