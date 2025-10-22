/* واردات خارجی */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
/* ایجاد اسکیمای دسته‌بندی */
const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: [true, "لطفاً نام دسته‌بندی را وارد کنید"],
      trim: true,
      unique: [true, "دسته‌بندی مشابه از قبل وجود دارد"],
      maxLength: [100, "عنوان شما باید حداکثر ۱۰۰ کاراکتر باشد"]
    },

    description: {
      type: String,
      required: [true, "لطفاً توضیحات دسته‌بندی را وارد کنید"],
      trim: true,
      maxLength: [500, "توضیحات شما باید حداکثر ۵۰۰ کاراکتر باشد"]
    },
    thumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ دسته بندی الزامی است"]
      }
    ],

    featureGroups: [
      {
        name: { type: String, required: true }, // مثلا "پردازنده" یا "صفحه نمایش"
        icon: { type: String }, 
        fields: [
          {
            name: { type: String, required: true },
            type: {
              type: String,
              default: "string"
            },
            options: [String], // برای select
            required: { type: Boolean, default: false },
            icon: { type: String }
          }
        ]
      }
    ],
    parentCategory: {
      type: ObjectId,
      ref: "Category",
      default: null
    },
    children: [
      {
        type: ObjectId,
        ref: "Category"
      }
    ],
    icon: {
      type: String,
      required: false
    },
    products: [
      {
        type: ObjectId,
        ref: "Product"
      }
    ],

    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  let splitStr = this.title?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.title = splitStr.join(" ");

  next();
});
categorySchema.pre("save", async function (next) {
  if (!this.isNew || this.categoryId) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "categoryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.categoryId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
