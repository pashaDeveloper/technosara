const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const techPlusSchema = new mongoose.Schema(
  {
    techPlusId: {
      type: Number,
      unique: true
    },
    services: [{ type: String, required: true }],
    service_list: [{ title: { type: String, required: true } }],
    services_summary: [{ type: String, required: true }],
    is_jet_eligible: { type: Boolean, required: true },
    cash_back: { type: Number, required: true },
    is_general_location_jet_eligible: { type: Boolean, required: true },
    fast_shipping_text: { type: String, required: true },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

techPlusSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.techPlusId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "techPlusId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.techPlusId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const DigiPlus = mongoose.model("DigiPlus", techPlusSchema);

module.exports = DigiPlus;