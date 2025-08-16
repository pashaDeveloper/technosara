const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const specificationSchema = new mongoose.Schema(
  {
    specificationId: {
      type: Number,
      unique: true
    },
    title: { type: String, required: true },
    attributes: [
      {
        title: { type: String, required: true },
        values: [{ type: String, required: true }]
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

specificationSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.specificationId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "specificationId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.specificationId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Specification = mongoose.model("Specification", specificationSchema);

module.exports = Specification;