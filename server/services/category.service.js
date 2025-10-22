const Category = require("../models/category.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new category */
exports.addCategory = async (req, res) => {
  try {
    const { body } = req;

    const thumbnail = req.uploadedFiles?.["thumbnail"]
      ? {
          url: req.uploadedFiles["thumbnail"][0].url,
          public_id: req.uploadedFiles["thumbnail"][0].key
        }
      : null;



    const category = new Category({
      title: body.title,
      description: body.description,
      thumbnail: thumbnail,
      keynotes: JSON.parse(body.keynotes || "[]"),
      tags: JSON.parse(body.tags || "[]"),
      creator: req.admin._id,
      icon: body.icon,
      parentCategory: body.category || null
    });

    const result = await category.save();

    await User.findByIdAndUpdate(result.creator, {
      $set: {
        category: result._id
      }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "دسته‌بندی با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("Error in addCategory:", error);

    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "خطا در ایجاد دسته‌بندی",
      error: error.message
    });
  }
};

/* get all categories */
exports.getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const categories = await Category.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate({
        path: "products",
        select: "_id"
      })
      .populate({
        path: "creator",
        select: "name avatar"
      })
      .populate({
        path: "children",
        select: "title"
      })
      
      .populate({
        path: "tags",
        select: "title"
      });

    const total = await Category.countDocuments(query);

    return res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته بندی ها با موفقیت دریافت شدند",
      data: categories,
      total
    });
  } catch (error) {
    console.error("Error in getCategories:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطا در دریافت دسته بندی‌ها",
      description: error.message || error.toString()
    });
  }
};


exports.getProductCategories = async (res) => {
  const categories = await Category.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active", publishStatus: "approved" },
    select: "_id"
  });
  const filteredCategories = categories.filter(
    (category) => category.products.length > 0
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: filteredCategories
  });
};
/* get a category */
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category fetched successfully",
    data: category
  });
};

/* update category */
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  let updatedCategory = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(category.thumbnail.public_id);

    updatedCategory.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedCategory.keynotes = JSON.parse(req.body.keynotes);
  updatedCategory.tags = JSON.parse(req.body.tags);

  await Category.findByIdAndUpdate(req.params.id, updatedCategory);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully"
  });
};

/* delete category */
exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته بندی پیدا نشد",
      description: "دسته بندی  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت حذف شد"
  });
};
