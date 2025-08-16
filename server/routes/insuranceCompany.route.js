

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const insuranceCompanyController = require("../controllers/insuranceCompany.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new insuranceCompany
router.post(
  "/add-insuranceCompany",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  insuranceCompanyController.addInsuranceCompany
);

// get all insuranceCompanies
router.get("/get-insuranceCompanies", insuranceCompanyController.getInsuranceCompanies);

// get a insuranceCompany
router.get("/get-insuranceCompany/:id", insuranceCompanyController.getInsuranceCompany);

// update insuranceCompany
router.patch(
  "/update-insuranceCompany/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  insuranceCompanyController.updateInsuranceCompany
);

// delete insuranceCompany
router.delete(
  "/delete-insuranceCompany/:id",
  verify,
  authorize("admin", "superAdmin"),
  insuranceCompanyController.deleteInsuranceCompany
);

module.exports = router;
