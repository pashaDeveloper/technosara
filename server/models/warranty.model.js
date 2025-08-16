const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { translateToEnglish, generateSlug } = require("../utils/seoUtils");

const warrantySchema = new mongoose.Schema(
  {
    warrantyId: {
      type: Number,
      unique: true
    },

    title_fa: {
      type: String,
      required: true,
      unique: true
    },
    title_en: {
      type: String
    },

    slug_fa: {
      type: String,
      unique: true,
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

    duration_months: { type: Number, required: true },

    provider: {
      type: ObjectId,
      ref: "WarrantyCompany",
      required: true
    },

    coverage: [String],         
    exclusions: [String],       
    conditions: [String],        
    refund_policy: [String],  
    activation_method: [String],  

    global_discount_percent: { type: Number, default: 0, min: 0, max: 100 },

    customer: {
      type: ObjectId,
      ref: "User" // یا مشتری
    },

    status: {
      type: String,
      enum: ["active", "expired", "void", "pending"],
      default: "pending"
    },

    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

warrantySchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.warrantyId) return next();

    if (!this.title_en && this.title_fa) {
      this.title_en = await translateToEnglish(this.title_fa);
    }

    if (!this.slug_en && this.title_fa) {
      this.slug_en = await generateSlug(this.title_fa);
    }

    if (!this.url) this.url = {};

    if (!this.url.uri_en) {
      this.url.uri_en = `/warranty/${this.slug_en}`;
    }

    if (!this.url.uri_fa && this.slug_fa) {
      this.url.uri_fa = `/warranty/${this.slug_fa}`;
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "warrantyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.warrantyId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Warranty = mongoose.model("Warranty", warrantySchema);

module.exports = Warranty;
