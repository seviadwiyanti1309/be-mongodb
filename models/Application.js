const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobCategory",
      required: true
    },
    cv: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
