

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const warrantyCompanyController = require("../controllers/warrantyCompany.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new warrantyCompany
router.post(
  "/add-warrantyCompany",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  warrantyCompanyController.addWarrantyCompany
);

// get all warrantyCompanies
router.get("/get-warrantyCompanies", warrantyCompanyController.getWarrantyCompanies);

// get a warrantyCompany
router.get("/get-warrantyCompany/:id", warrantyCompanyController.getWarrantyCompany);

// update warrantyCompany
router.patch(
  "/update-warrantyCompany/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  warrantyCompanyController.updateWarrantyCompany
);

// delete warrantyCompany
router.delete(
  "/delete-warrantyCompany/:id",
  verify,
  authorize("admin", "superAdmin"),
  warrantyCompanyController.deleteWarrantyCompany
);

module.exports = router;
