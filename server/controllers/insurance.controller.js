
/* internal import */
const insuranceService = require("../services/insurance.service");

/* add new insurance */
exports.addInsurance = async (req, res, next) => {
  try {
    await insuranceService.addInsurance(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all insurances */
exports.getInsurances = async (req, res, next) => {
  try {
    await insuranceService.getInsurances(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a insurance */
exports.getInsurance = async (req, res, next) => {
  try {
    await insuranceService.getInsurance(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update insurance */
exports.updateInsurance = async (req, res, next) => {
  try {
    await insuranceService.updateInsurance(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete insurance */
exports.deleteInsurance = async (req, res, next) => {
  try {
    await insuranceService.deleteInsurance(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
