const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const commentSchema = new mongoose.Schema(
  {
    commentId: {
      type: Number,
      unique: true
    },
    title: { type: String, default: "" },
    body: { type: String, required: true },
    created_at: { type: String, required: true },
    rate: { type: Number, required: true },
    reactions: {
      likes: { type: Number, required: true },
      dislikes: { type: Number, required: true }
    },
    is_buyer: { type: Boolean, required: true },
    user_name: { type: String, required: true },
    is_anonymous: { type: Boolean, required: true },
    relative_date: { type: String, required: true },
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

commentSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.commentId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "commentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.commentId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;