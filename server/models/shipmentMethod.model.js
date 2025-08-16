const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const shipmentMethodSchema = new mongoose.Schema(
  {
    shipmentMethodId: {
      type: Number,
      unique: true
    },
    description: { type: String, required: true },
    has_lead_time: { type: Boolean, required: true },
    providers: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        has_lead_time: { type: Boolean, required: true },
        type: { type: String, required: true },
        label: { title: { type: String, required: true } },
        price: {
          text: { type: String, required: true },
          is_free: { type: Boolean, required: true }
        },
        shipping_mode: { type: String, required: true },
        delivery_day: { type: String, required: true }
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

shipmentMethodSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.shipmentMethodId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "shipmentMethodId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.shipmentMethodId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const ShipmentMethod = mongoose.model("ShipmentMethod", shipmentMethodSchema);

module.exports = ShipmentMethod;