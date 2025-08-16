

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const categoryController = require("../controllers/category.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new category
router.post(
  "/add-category",
  verify,
  authorize("superAdmin","admin", "seller"),
  upload('category').single("thumbnail"),
  categoryController.addCategory
);

// get all categories
router.get("/get-categories", categoryController.getCategories);
router.get("/get-categories-with-products", categoryController.getProductCategories);

// get a category
router.get("/get-category/:id", categoryController.getCategory);

// update category
router.patch(
  "/update-category/:id",
  verify,
  authorize("superAdmin","admin", "seller"),
  upload('category').single("thumbnail"),
  categoryController.updateCategory
);

// delete category
router.delete(
  "/delete-category/:id",
  verify,
  authorize("superAdmin","admin", "seller"),
  categoryController.deleteCategory
);

module.exports = router;
