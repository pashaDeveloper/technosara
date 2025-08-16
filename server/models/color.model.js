const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { generateSlug, translateToEnglish } = require("../utils/seoUtils");

const colorSchema = new mongoose.Schema(
  {
    colorId: {
      type: Number,
      unique: true
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
    hex_code: {
      type: String,
      required: true
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);


colorSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.colorId) return next();

    if (!this.title_en && this.title_fa) {
      this.title_en = await translateToEnglish(this.title_fa);
    }

    if (!this.slug_en && this.title_fa) {
      this.slug_en = await generateSlug(this.title_fa);
    }


    const counter = await Counter.findOneAndUpdate(
      { name: "colorId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.colorId = `${counter.seq}`;
    next();
  } catch (error) {
    next(error);
  }
});
const Color = mongoose.model("Color", colorSchema);

module.exports = Color;