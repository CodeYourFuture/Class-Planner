const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/v1/classes
// @access  Public
exports.getClasses = async (req, res, next) => {
    res.json({
        status:"success",
        message:"GET CLASSES"
    })
}

// @desc    Add class
// @route   POST /api/v1/classes
// @access  Public
exports.addClass = async (req, res, next) => {
    res.json({
        status:"success",
        message:"ADD CLASS"
    })
}

// @desc    Delete class
// @route   DELETE /api/v1/classes/:id
// @access  Public
exports.deleteClass = async (req, res, next) => {
    res.json({
        status:"success",
        message:"DELETE CLASS"
    })
}

// @desc    Update class
// @route   Update /api/v1/classes/:id
// @access  Public
exports.updateClass = async (req, res, next) => {
    res.json({
        status:"success",
        message:"UPDATE CLASS"
    })
}