

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const warrantyController = require("../controllers/warranty.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new warranty
router.post(
  "/add-warranty",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  warrantyController.addWarranty
);

// get all warrantys
router.get("/get-warranties", warrantyController.getWarranties);

// get a warranty
router.get("/get-warranty/:id", warrantyController.getWarranty);

// update warranty
router.patch(
  "/update-warranty/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('company').single("logo"),
  warrantyController.updateWarranty
);

// delete warranty
router.delete(
  "/delete-warranty/:id",
  verify,
  authorize("admin", "superAdmin"),
  warrantyController.deleteWarranty
);

module.exports = router;
