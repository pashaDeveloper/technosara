/* internal import */
const Warranty = require("../models/warranty.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");

/* add new warranty */
exports.addWarranty = async (req, res) => {
  try {

    const {
      coverage,
      exclusions,
      refund_policy,
      activation_method,
      conditions, 
      ...otherinfo
    } = req.body;

    const parsedCoverage = coverage ? JSON.parse(coverage) : [];
    const parsedExclusions = exclusions ? JSON.parse(exclusions) : [];
    const parsedRefundPolicy = refund_policy ? JSON.parse(refund_policy) : [];
    const parsedActivationMethod = activation_method ? JSON.parse(activation_method) : [];
    const parsedconditions= activation_method ? JSON.parse(conditions) : [];

    const warranty = new Warranty({
      ...otherinfo,
      coverage:parsedCoverage,
      exclusions:parsedExclusions,
      refund_policy:parsedRefundPolicy,
      activation_method:parsedActivationMethod,
      conditions:parsedconditions,
      creator: req.admin._id,

    });

    const result = await warranty.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "گارانتی با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.error("Error creating warranty:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: "خطا در ایجاد گارانتی: " + error.message
    });
  }
};

exports.getWarranties= async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;
    const query = { isDeleted: false };

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }

const warranties = await Warranty.find(query)
  .skip(skip)
  .limit(limitNum)
  .sort({ createdAt: -1 })
  .populate("creator","name avatar") 
  .populate("provider", "name_fa _id")
    const total = await Warranty.countDocuments(query);
console.log("warranties",warranties)
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست گارانتی‌ها با موفقیت دریافت شد",
      data: warranties,
      total
    });
  } catch (error) {
    console.error("خطا در دریافت لیست گارانتی‌ها:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Server Error",
      description: "خطا در دریافت لیست گارانتی‌ها",
      error: error.message
    });
  }
};

/* get a warranty */
exports.getWarranty = async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Warranty fetched successfully",
    data: warranty
  });
};

/* update warranty */
exports.updateWarranty = async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);
  let updatedWarranty = req.body;

  if (!req.body.logo && req.file) {
    await remove(warranty.logo.public_id);

    updatedWarranty.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedWarranty.keynotes = JSON.parse(req.body.keynotes);
  updatedWarranty.tags = JSON.parse(req.body.tags);

  await Warranty.findByIdAndUpdate(req.params.id, updatedWarranty);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Warranty updated successfully"
  });
};

/* delete warranty */
exports.deleteWarranty = async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);
  if (!warranty) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "Warranty not found"
    });
  }

  warranty.isDeleted = true;
  await warranty.save();

  await Product.updateMany({ warranty: req.params.id }, { $unset: { warranty: "" } });
  await Admin.findByIdAndUpdate(warranty.creator, {
    $unset: { warranty: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Warranty marked as deleted"
  });
};
