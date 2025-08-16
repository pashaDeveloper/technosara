

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const colorController = require("../controllers/color.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new color
router.post(
  "/add-color",
  verify,
  authorize("admin", "superAdmin"),
  colorController.addColor
);

// get all colors
router.get("/get-colors", colorController.getColors);

// get a color
router.get("/get-color/:id", colorController.getColor);

// update color
router.patch(
  "/update-color/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('color').single("logo"),
  colorController.updateColor
);

// delete color
router.delete(
  "/delete-color/:id",
  verify,
  authorize("admin", "superAdmin"),
  colorController.deleteColor
);

module.exports = router;
