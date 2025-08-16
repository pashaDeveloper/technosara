const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      unique: true
    },
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "answered", "closed"],
      default: "pending"
    },
    answer_count: { type: Number, required: true },
    sender: { type: String, required: true },
    created_at: { type: String, required: true },
    customer: {
      type: ObjectId,
      ref: "User"
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

questionSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.questionId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "questionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.questionId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;