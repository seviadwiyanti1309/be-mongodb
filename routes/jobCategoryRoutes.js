const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobCategoryController");

// MULTER CONFIG 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// CREATE
router.post("/", upload.single("image"), createJob);

// READ
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// UPDATE
router.put("/:id", upload.single("image"), updateJob);

// DELETE
router.delete("/:id", deleteJob);

module.exports = router;
