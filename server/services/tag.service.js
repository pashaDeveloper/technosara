

/* internal import */
const Tag = require("../models/tag.model");
const admin = require("../models/admin.model");

/* add new tag */
exports.addTag = async (req, res) => {
  const { body } = req;
  const parsedRobots = JSON.parse(body.robots);
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));
  const tag = new Tag({
    title: body.title,
    description: body.description,
    tags: JSON.parse(body.tags),
    creator: req.admin._id,
    robots: robotsArray,
 
  });

  const result = await tag.save();

  await admin.findByIdAndUpdate(result.creator, {
    $set: { tag: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "تگ باموفقیت دریافت شد",
  });
};

/* get all tags */
exports.getTags = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const query = { isDeleted: false };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tags = await Tag.find(query)
      .skip(skip)
      .limit(limitNum)
      .populate({
        path: "creator",
        select: "name avatar",
      });

    const total = await Tag.countDocuments(query);

    return res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تگ ها با موفقیت دریافت شدند",
      data: tags,
      total,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطا در دریافت تگ‌ها",
      description: error.message || "خطای سرور",
    });
  }
};


/* get a tag */
exports.getTag = async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت دریافت شد",
    data: tag,
  });
};

/* update tag */
exports.updateTag = async (req, res) => {
  let updatedTag = req.body;
  const parsedRobots = JSON.parse(req.body.robots);
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));


  updatedTag.keynotes = JSON.parse(req.body.keynotes);
  updatedTag.robots = robotsArray;
  await Tag.findByIdAndUpdate(req.params.id, updatedTag);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت ویرایش شد",
  });
};

/* delete tag */
exports.deleteTag = async (req, res) => {
  const tag = await Tag.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );
    
  if (!tag) {
    return res.status(404).json({
      acknowledgement: false,
      message: "تگ پیدا نشد",
      description: "تگی که می‌خواهید حذف کنید، وجود ندارد",
    });
  }



  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت حذف شد",
  });
};
