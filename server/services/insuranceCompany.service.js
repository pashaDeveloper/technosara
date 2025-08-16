/* internal import */
const InsuranceCompany = require("../models/insuranceCompany.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");

/* add new insuranceCompany */
exports.addInsuranceCompany = async (req, res) => {
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

    const insuranceCompany = new InsuranceCompany({
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

    const result = await insuranceCompany.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "InsuranceCompany created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating insuranceCompany:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Failed",
      description: error.message
    });
  }
};

exports.getInsuranceCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const query = { isDeleted: false };

    if (search) {
      query.name_fa = { $regex: search, $options: "i" }; 
    }

    const insuranceCompanies = await InsuranceCompany.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate("creator");

    const total = await InsuranceCompany.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست شرکت های بیمه با موفقیت دریافت شد",
      data: insuranceCompanies,
      total
    });
  } catch (error) {
    console.error("خطا در دریافت لیست شرکت‌های بیمه:", error);

    res.status(500).json({
      acknowledgement: false,
      message: "Server Error",
      description: "خطا در دریافت لیست شرکت های بیمه",
      error: error.message
    });
  }
};

/* get a insuranceCompany */
exports.getInsuranceCompany = async (req, res) => {
  const insuranceCompany = await InsuranceCompany.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "InsuranceCompany fetched successfully",
    data: insuranceCompany
  });
};

/* update insuranceCompany */
exports.updateInsuranceCompany = async (req, res) => {
  const insuranceCompany = await InsuranceCompany.findById(req.params.id);
  let updatedInsuranceCompany = req.body;

  if (!req.body.logo && req.file) {
    await remove(insuranceCompany.logo.public_id);

    updatedInsuranceCompany.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedInsuranceCompany.keynotes = JSON.parse(req.body.keynotes);
  updatedInsuranceCompany.tags = JSON.parse(req.body.tags);

  await InsuranceCompany.findByIdAndUpdate(
    req.params.id,
    updatedInsuranceCompany
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "InsuranceCompany updated successfully"
  });
};

/* delete insuranceCompany */
exports.deleteInsuranceCompany = async (req, res) => {
  const insuranceCompany = await InsuranceCompany.findById(req.params.id);
  if (!insuranceCompany) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "InsuranceCompany not found"
    });
  }

  insuranceCompany.isDeleted = true;
  await insuranceCompany.save();

  await Product.updateMany(
    { insuranceCompany: req.params.id },
    { $unset: { insuranceCompany: "" } }
  );
  await Admin.findByIdAndUpdate(insuranceCompany.creator, {
    $unset: { insuranceCompany: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "InsuranceCompany marked as deleted"
  });
};
