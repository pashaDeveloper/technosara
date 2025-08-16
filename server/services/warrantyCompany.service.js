/* internal import */
const WarrantyCompany = require("../models/warrantyCompany.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");

/* add new warrantyCompany */
exports.addWarrantyCompany = async (req, res) => {
  try {
    const { address, phone, email, website, ...otherinfo } = req.body;
    let logo = null;

    if (req.uploadedFiles["logo"]?.length) {
      logo = {
        url: req.uploadedFiles["logo"][0].url,
        public_id: req.uploadedFiles["logo"][0].key
      };
    }

    // تبدیل آدرس
    const parsedAddress = JSON.parse(address);

    const addressDoc = new Address({
      province: parsedAddress.province,
      city: parsedAddress.city,
      street: parsedAddress.street,
      plateNumber: parsedAddress.plateNumber,
      floor: parsedAddress.floor,
      unit: parsedAddress.unit,
      postalCode: parsedAddress.postalCode
    });

    await addressDoc.save();

    const warrantyCompany = new WarrantyCompany({
      ...otherinfo,
      logo,
      creator: req.admin._id,
      contact: {
        phone: phone,
        website: website,
        email: email
      },
      addresses: [addressDoc._id]
    });

    const result = await warrantyCompany.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "َشرکت گارانتی با موفقیت افزوده شد",
      data: result
    });
  } catch (error) {
    console.error("خطا در ساخت شرکت گارانتی:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: error.message
    });
  }
};

exports.getWarrantyCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const query = { isDeleted: false };

    if (search) {
      query.name_fa = { $regex: search, $options: "i" }; 
    }

    const warrantyCompanies = await WarrantyCompany.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate("creator");

    const total = await WarrantyCompany.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست شرکت های گارانتی با موفقیت دریافت شد",
      data: warrantyCompanies,
      total
    });
  } catch (error) {
    console.error("خطا در دریافت لیست شرکت‌های گارانتی:", error);

    res.status(500).json({
      acknowledgement: false,
      message: "Server Error",
      description: "خطا در دریافت لیست شرکت های گارانتی",
      error: error.message
    });
  }
};

/* get a warrantyCompany */
exports.getWarrantyCompany = async (req, res) => {
  const warrantyCompany = await WarrantyCompany.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "WarrantyCompany fetched successfully",
    data: warrantyCompany
  });
};

/* update warrantyCompany */
exports.updateWarrantyCompany = async (req, res) => {
  const warrantyCompany = await WarrantyCompany.findById(req.params.id);
  let updatedWarrantyCompany = req.body;

  if (!req.body.logo && req.file) {
    await remove(warrantyCompany.logo.public_id);

    updatedWarrantyCompany.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedWarrantyCompany.keynotes = JSON.parse(req.body.keynotes);
  updatedWarrantyCompany.tags = JSON.parse(req.body.tags);

  await WarrantyCompany.findByIdAndUpdate(
    req.params.id,
    updatedWarrantyCompany
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "WarrantyCompany updated successfully"
  });
};

/* delete warrantyCompany */
exports.deleteWarrantyCompany = async (req, res) => {
  const warrantyCompany = await WarrantyCompany.findById(req.params.id);
  if (!warrantyCompany) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "WarrantyCompany not found"
    });
  }

  warrantyCompany.isDeleted = true;
  await warrantyCompany.save();

  await Product.updateMany(
    { warrantyCompany: req.params.id },
    { $unset: { warrantyCompany: "" } }
  );
  await Admin.findByIdAndUpdate(warrantyCompany.creator, {
    $unset: { warrantyCompany: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "WarrantyCompany marked as deleted"
  });
};
