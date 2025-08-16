
/* internal import */
const warrantyService = require("../services/warranty.service");

/* add new warranty */
exports.addWarranty = async (req, res, next) => {
  try {
    await warrantyService.addWarranty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all warrantys */
exports.getWarranties = async (req, res, next) => {
  try {
    await warrantyService.getWarranties(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a warranty */
exports.getWarranty = async (req, res, next) => {
  try {
    await warrantyService.getWarranty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update warranty */
exports.updateWarranty = async (req, res, next) => {
  try {
    await warrantyService.updateWarranty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete warranty */
exports.deleteWarranty = async (req, res, next) => {
  try {
    await warrantyService.deleteWarranty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
