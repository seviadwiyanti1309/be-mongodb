const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob} = require("../controllers/jobCategoryController");

// CRUD Job Category

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;