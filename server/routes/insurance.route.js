

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const insuranceController = require("../controllers/insurance.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new insurance
router.post(
  "/add-insurance",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  insuranceController.addInsurance
);

// get all insurances
router.get("/get-insurances", insuranceController.getInsurances);

// get a insurance
router.get("/get-insurance/:id", insuranceController.getInsurance);

// update insurance
router.patch(
  "/update-insurance/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  insuranceController.updateInsurance
);

// delete insurance
router.delete(
  "/delete-insurance/:id",
  verify,
  authorize("admin", "superAdmin"),
  insuranceController.deleteInsurance
);

module.exports = router;
