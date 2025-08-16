
/* internal import */
const warrantyCompanyService = require("../services/warrantyCompany.service");

/* add new warrantyCompany */
exports.addWarrantyCompany = async (req, res, next) => {
  try {
    await warrantyCompanyService.addWarrantyCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all warrantyCompanies */
exports.getWarrantyCompanies = async (req, res, next) => {
  try {
    await warrantyCompanyService.getWarrantyCompanies(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a warrantyCompany */
exports.getWarrantyCompany = async (req, res, next) => {
  try {
    await warrantyCompanyService.getWarrantyCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update warrantyCompany */
exports.updateWarrantyCompany = async (req, res, next) => {
  try {
    await warrantyCompanyService.updateWarrantyCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete warrantyCompany */
exports.deleteWarrantyCompany = async (req, res, next) => {
  try {
    await warrantyCompanyService.deleteWarrantyCompany(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
