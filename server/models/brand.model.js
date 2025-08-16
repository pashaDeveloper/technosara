const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { generateSlug, translateToEnglish } = require("../utils/seoUtils");

const brandSchema = new mongoose.Schema(
  {
    brandId: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      required: true
    },
    title_fa: {
      type: String,
      required:true,
      unique:true
    },
    title_en: {
      type: String
    },
    slug_fa: {
      type: String,
      unique: true,
      required: false,
      index: true,
      default: function () {
        return this.title_fa
          ?.toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    },
    slug_en: {
      type: String,
      unique: true,
      index: true
    },
    url: {
      uri_en: {
        type: String,
        unique: true,
        sparse: true
      },
      uri_fa: {
        type: String,
        unique: true,
        sparse: true
      }
    },

    visibility: {
      type: Boolean,
      default: true
    },
    logo: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png"
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
        required: [true, "تگ برند الزامی است"]
      }
    ],
    is_premium: {
      type: Boolean,
      default: false
    },
    is_miscellaneous: {
      type: Boolean,
      default: false
    },
    is_name_similar: {
      type: Boolean,
      default: false
    },
    is_international: {
      type: Boolean,
      default: false
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    description: { type: String },
    ...baseSchema.obj
  },
  { timestamps: true }
);

brandSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.brandId) return next();

    if (!this.title_en && this.title_fa) {
      this.title_en = await translateToEnglish(this.title_fa);
    }

    if (!this.slug_en && this.title_fa) {
      this.slug_en = await generateSlug(this.title_fa);
    }


    const prefix = "tsb";
    const counter = await Counter.findOneAndUpdate(
      { name: "brandId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.brandId = `${prefix}-${counter.seq}`;

    if (!this.url || !this.url.uri_en) {
      this.url = {
        ...this.url,
        uri_en: `/brand/${this.brandId}/${this.slug_en}`
      };
    }

    if (!this.url.uri_fa && this.slug_fa) {
      this.url.uri_fa = `/brand/${this.brandId}/${this.slug_fa}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
