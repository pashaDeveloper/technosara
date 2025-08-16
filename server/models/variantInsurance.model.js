const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Insurance = require("./insurance");
const baseSchema = require("./baseSchema.model");

const variantInsuranceSchema = new mongoose.Schema(
  {
    variant: { 
      type: ObjectId, 
      ref: "Variant", 
      required: true 
    },
    insurance: { 
      type: ObjectId, 
      ref: "Insurance", 
      required: true 
    },
    base_premium: { 
      type: Number, 
      required: true 
    },
    tax: { 
      type: Number, 
      default: 0 
    },
    product_discount_percent: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 100 
    },
    before_discount: { 
      type: Number 
    },
    discount_percent: { 
      type: Number 
    },
    discount: { 
      type: Number 
    },
    total_premium: { 
      type: Number 
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

variantInsuranceSchema.pre("save", async function (next) {
  try {
    const insuranceDoc = await Insurance.findById(this.insurance);
    if (!insuranceDoc) {
      return next(new Error("Insurance plan not found"));
    }

    const globalDiscount = insuranceDoc.global_discount_percent || 0;
    const productDiscount = this.product_discount_percent || 0;
    const totalDiscountPercent = Math.min(
      globalDiscount + productDiscount, 
      100
    );

    const beforeDiscount = this.base_premium + this.tax;
    const discountAmount = (beforeDiscount * totalDiscountPercent) / 100;
    const totalPremium = beforeDiscount - discountAmount;

    this.before_discount = beforeDiscount;
    this.discount_percent = totalDiscountPercent;
    this.discount = discountAmount;
    this.total_premium = totalPremium;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model(
  "VariantInsurance", 
  variantInsuranceSchema
);
