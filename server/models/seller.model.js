const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const sellerSchema = new mongoose.Schema(
  {
    sellerId: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      uri: { type: String, required: true }
    },
    rating: {
      total_rate: { type: Number, required: true },
      total_count: { type: Number, required: true },
      commitment: { type: Number, required: true },
      no_return: { type: Number, required: true },
      on_time_shipping: { type: Number, required: true }
    },
    properties: {
      is_trusted: { type: Boolean, required: true },
      is_official: { type: Boolean, required: true },
      is_roosta: { type: Boolean, required: true },
      is_new: { type: Boolean, required: true }
    },
    stars: { type: Number, required: true },
    grade: {
      label: { type: String, required: true },
      color: { type: String, required: true }
    },
    registration_date: { type: String, required: true },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.sellerId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "sellerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.sellerId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;