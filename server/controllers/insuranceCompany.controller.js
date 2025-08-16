
/* internal import */
const insuranceCompanyService = require("../services/insuranceCompany.service");

/* add new insuranceCompany */
exports.addInsuranceCompany = async (req, res, next) => {
  try {
    await insuranceCompanyService.addInsuranceCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all insuranceCompanies */
exports.getInsuranceCompanies = async (req, res, next) => {
  try {
    await insuranceCompanyService.getInsuranceCompanies(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a insuranceCompany */
exports.getInsuranceCompany = async (req, res, next) => {
  try {
    await insuranceCompanyService.getInsuranceCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update insuranceCompany */
exports.updateInsuranceCompany = async (req, res, next) => {
  try {
    await insuranceCompanyService.updateInsuranceCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete insuranceCompany */
exports.deleteInsuranceCompany = async (req, res, next) => {
  try {
    await insuranceCompanyService.deleteInsuranceCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
