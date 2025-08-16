
/* internal import */
const colorService = require("../services/color.service");

/* add new color */
exports.addColor = async (req, res, next) => {
  try {
    await colorService.addColor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all colors */
exports.getColors = async (req, res, next) => {
  try {
    await colorService.getColors(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a color */
exports.getColor = async (req, res, next) => {
  try {
    await colorService.getColor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update color */
exports.updateColor = async (req, res, next) => {
  try {
    await colorService.updateColor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete color */
exports.deleteColor = async (req, res, next) => {
  try {
    await colorService.deleteColor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
