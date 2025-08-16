const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { translateToEnglish, generateSlug } = require("../utils/seoUtils");

const insuranceCompanySchema = new mongoose.Schema(
  {
    companyId: {
      type: Number,
      unique: true
    },

    name_fa: {
      type: String,
      required: true,
      unique: true
    },
    name_en: {
      type: String
    },

    slug_fa: {
      type: String,
      unique: true,
      index: true,
      default: function () {
        return this.name_fa
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

    logo: {
      url: {
        type: String,
        default: "https://placehold.co/296x200.png",
        required: true
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    rating: {
      // امتیاز کلی شرکت (میانگین امتیازات)، مثلاً 86 از 100
      total_rate: { type: Number, required: false },

      // تعداد کل امتیازدهی‌های ثبت شده (مثلاً 1500 نفر)
      total_count: { type: Number, required: false },

      // میزان تعهد شرکت به انجام تعهدات خود (مثلاً پرداخت خسارت، پشتیبانی، پایبندی به قرارداد)
      commitment: { type: Number, required: false },

      // درصد مواردی که بدون برگشت یا شکایت انجام شده‌اند (هرچه بالاتر، بهتر)
      no_return: { type: Number, required: false },

      // امتیاز مربوط به سرعت و به‌موقع بودن در ارائه خدمات (مثلاً ارسال بیمه‌نامه، پاسخ‌دهی یا پرداخت خسارت)
      on_time_shipping: { type: Number, required: false }
    },
    contact: {
      phone: {
        type: String,
        trim: true
      },
      website: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        lowercase: true
      }
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
      }
    ],
    description: {
      type: String
    },

    is_international: {
      type: Boolean,
      default: false
    },

    is_trusted: { type: Boolean, default: false }, // مورد اعتماد بودن
    is_official: { type: Boolean, default: false }, // رسمی بودن
    is_new: { type: Boolean, default: false },
    solvency_level: { type: Number, required: false }, // سطح توانگری مالی (1 تا 5)
    regulatory_body: { type: String, required: false }, // نهاد نظارتی (مثل بیمه مرکزی)
    customer_satisfaction_rate: { type: Number, required: false }, // درصد رضایت مشتریان
    claim_settlement_rate: { type: Number, required: false },
    visibility: {
      type: Boolean,
      default: true
    },
    license_number: {
      type: String,
      required: false,
      match: /^[A-Z0-9-]{8,12}$/
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

insuranceCompanySchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.companyId) return next();

    if (!this.name_en && this.name_fa) {
      this.name_en = await translateToEnglish(this.name_fa);
    }

    if (!this.slug_en && this.name_fa) {
      this.slug_en = await generateSlug(this.name_fa);
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "companyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.companyId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const InsuranceCompany = mongoose.model(
  "InsuranceCompany",
  insuranceCompanySchema
);
module.exports = InsuranceCompany;
