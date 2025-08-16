/* internal import */
const Color = require("../models/color.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new color */
exports.addColor = async (req, res) => {
  try {
    const { body } = req;
    let logo = null;

    const color = new Color({
      code: body.code || `BR-${Date.now()}`,
      hex_code:body.hex_code,
      title_fa: body.title_fa,
      creator: req.admin._id
    });

    const result = await color.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Color created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating color:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: error.message
    });
  }
};

exports.getColors = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 5;
  const skip = (pageNum - 1) * limitNum;

  const query = { isDeleted: false };

  if (search) {
    query.title_fa = { $regex: search, $options: "i" };
  }

  const colors = await Color.find(query)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 })
    .populate({ path: "creator", select: "name avatar" });
  const total = await Color.countDocuments(query);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "لیست رنگها با موفقیت دریافت شد",
    data: colors,
    total
  });
};

/* get a color */
exports.getColor = async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "رنگ با موفقیت دریافت شد",
    data: color
  });
};

/* update color */
exports.updateColor = async (req, res) => {
  const color = await Color.findById(req.params.id);
  let updatedColor = req.body;

  if (!req.body.logo && req.file) {
    await remove(color.logo.public_id);

    updatedColor.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  await Color.findByIdAndUpdate(req.params.id, updatedColor);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "بند با موفقیت ویرایش شد"
  });
};

/* delete color */
exports.deleteColor = async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    return res.status(404).json({
      acknowledgement: false,
      message: "یافت نشد",
      description: "رنگ یافت نشد"
    });
  }

  color.isDeleted = true;
  await color.save();

  await Product.updateMany({ color: req.params.id }, { $unset: { color: "" } });
  await Admin.findByIdAndUpdate(color.creator, {
    $unset: { color: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "رنگ با موفقیت حذف شد"
  });
};
