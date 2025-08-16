/* internal import */
const Brand = require("../models/brand.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new brand */
exports.addBrand = async (req, res) => {
  try {
    const { body } = req;
    let logo = null;
    const parsedTags = JSON.parse(body.tags);

    if (req.uploadedFiles["logo"].length) {
      logo = {
        url: req.uploadedFiles["logo"][0].url,
        public_id: req.uploadedFiles["logo"][0].key
      };
    }

    const brand = new Brand({
      code: body.code || `BR-${Date.now()}`,
      description: body.description,
      logo,
      tags: parsedTags,
      creator: req.admin._id,
      is_premium: body.is_premium || false,
      is_miscellaneous: body.is_miscellaneous || false,
      is_name_similar: body.is_name_similar || false,
      title_fa: body.title
    });

    const result = await brand.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Brand created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating brand:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: error.message
    });
  }
};

exports.getBrands = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 5;
  const skip = (pageNum - 1) * limitNum;

  const query = { isDeleted: false };

  if (search) {
    query.title_fa = { $regex: search, $options: "i" };
  }

  const brands = await Brand.find(query)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 })
    .populate({ path: "creator", select: "name avatar" })
    .populate({
      path: "tags",
      select: "title"
    });
  const total = await Brand.countDocuments(query);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "لیست برندها با موفقیت دریافت شد",
    data: brands,
    total
  });
};

/* get a brand */
exports.getBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "برند با موفقیت دریافت شد",
    data: brand
  });
};

/* update brand */
exports.updateBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  let updatedBrand = req.body;

  if (!req.body.logo && req.file) {
    await remove(brand.logo.public_id);

    updatedBrand.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedBrand.keynotes = JSON.parse(req.body.keynotes);
  updatedBrand.tags = JSON.parse(req.body.tags);

  await Brand.findByIdAndUpdate(req.params.id, updatedBrand);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "بند با موفقیت ویرایش شد"
  });
};

/* delete brand */
exports.deleteBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({
      acknowledgement: false,
      message: "یافت نشد",
      description: "برند یافت نشد"
    });
  }

  brand.isDeleted = true;
  await brand.save();

  await Product.updateMany({ brand: req.params.id }, { $unset: { brand: "" } });
  await Admin.findByIdAndUpdate(brand.creator, {
    $unset: { brand: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "برند با موفقیت حذف شد"
  });
};
