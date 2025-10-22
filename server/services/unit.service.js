

/* internal import */
const Unit = require("../models/unit.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new unit */
exports.addUnit = async (req, res) => {
  const { title,symbol} = req.body;
  const unit = new Unit({
    title: title,
    symbol: symbol,
    creator: req.admin._id
  });

  const result = await unit.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { unit: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "واحد  با موفقیت ایجاد شد",
  });
};

/* get all units */
exports.getUnits = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // جستجو بر اساس عنوان واحد
    }

    const units = await Unit.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate({
        path: "creator",
        select: "name avatar"
      });

    const total = await Unit.countDocuments(query);

    return res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "واحدها با موفقیت دریافت شدند",
      data: units,
      total,
    });
  } catch (error) {
    console.error("Error in getUnits:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطا در دریافت واحدها",
      description: error.message || error.toString()
    });
  }
};


/* get a unit */
exports.getUnit = async (req, res) => {
  const unit = await Unit.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit fetched successfully",
    data: unit,
  });
};

/* update unit */
exports.updateUnit = async (req, res) => {
  let updatedUnit = req.body;
  await Unit.findByIdAndUpdate(req.params.id, updatedUnit);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit updated successfully",
  });
};

/* delete unit */
exports.deleteUnit = async (req, res) => {
  const unit = await Unit.findByIdAndDelete(req.params.id);
  await remove(unit.logo.public_id);

  await Product.updateMany({ unit: req.params.id }, { $unset: { unit: "" } });
  await User.findByIdAndUpdate(unit.creator, {
    $unset: { unit: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit deleted successfully",
  });
};
