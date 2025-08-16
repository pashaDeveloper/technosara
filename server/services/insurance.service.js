/* internal import */
const Insurance = require("../models/insurance.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");

/* add new insurance */
exports.addInsurance = async (req, res) => {
  try {

    const {
      coverage,
      exclusions,
      refund_policy,
      activation_method,
      ...otherinfo
    } = req.body;

    const parsedCoverage = coverage ? JSON.parse(coverage) : [];
    const parsedExclusions = exclusions ? JSON.parse(exclusions) : [];
    const parsedRefundPolicy = refund_policy ? JSON.parse(refund_policy) : [];
    const parsedActivationMethod = activation_method ? JSON.parse(activation_method) : [];

    const insurance = new Insurance({
      ...otherinfo,
      coverage:parsedCoverage,
      exclusions:parsedExclusions,
      refund_policy:parsedRefundPolicy,
      activation_method:parsedActivationMethod,
      creator: req.admin._id,

    });

    const result = await insurance.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "بیمه با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.error("Error creating insurance:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: "خطا در ایجاد بیمه: " + error.message
    });
  }
};

exports.getInsurances = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;
    const query = { isDeleted: false };

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }

const insurances = await Insurance.find(query)
  .skip(skip)
  .limit(limitNum)
  .sort({ createdAt: -1 })
  .populate("creator","name avatar") 
  .populate("provider", "name_fa _id")
    const total = await Insurance.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست بیمه‌ها با موفقیت دریافت شد",
      data: insurances,
      total
    });
  } catch (error) {
    console.error("خطا در دریافت لیست بیمه‌ها:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Server Error",
      description: "خطا در دریافت لیست بیمه‌ها",
      error: error.message
    });
  }
};

/* get a insurance */
exports.getInsurance = async (req, res) => {
  const insurance = await Insurance.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Insurance fetched successfully",
    data: insurance
  });
};

/* update insurance */
exports.updateInsurance = async (req, res) => {
  const insurance = await Insurance.findById(req.params.id);
  let updatedInsurance = req.body;

  if (!req.body.logo && req.file) {
    await remove(insurance.logo.public_id);

    updatedInsurance.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedInsurance.keynotes = JSON.parse(req.body.keynotes);
  updatedInsurance.tags = JSON.parse(req.body.tags);

  await Insurance.findByIdAndUpdate(req.params.id, updatedInsurance);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Insurance updated successfully"
  });
};

/* delete insurance */
exports.deleteInsurance = async (req, res) => {
  const insurance = await Insurance.findById(req.params.id);
  if (!insurance) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "Insurance not found"
    });
  }

  insurance.isDeleted = true;
  await insurance.save();

  await Product.updateMany({ insurance: req.params.id }, { $unset: { insurance: "" } });
  await Admin.findByIdAndUpdate(insurance.creator, {
    $unset: { insurance: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Insurance marked as deleted"
  });
};
