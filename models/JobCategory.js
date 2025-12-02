const mongoose = require("mongoose");
const { type } = require("os");

const jobCategorySchema = new mongoose.Schema({
    job_name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    applicant: {type: Number, default: 0},
}, { timestamps: true });

module.exports = mongoose.model("JobCategory", jobCategorySchema);