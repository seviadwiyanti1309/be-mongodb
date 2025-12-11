// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   createJob,
//   getAllJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
// } = require("../controllers/jobCategoryController");

// // MULTER CONFIG 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // CREATE
// router.post("/", upload.single("image"), createJob);

// // READ
// router.get("/", getAllJobs);
// router.get("/:id", getJobById);

// // UPDATE
// router.put("/:id", upload.single("image"), updateJob);

// // DELETE
// router.delete("/:id", deleteJob);

// module.exports = router;


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

const { verifyToken } = require("../middleware/auth");
const { isHR } = require("../middleware/role");

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ============================
// ✅ ROUTES
// ============================

// ✅ CREATE JOB (HR ONLY)
router.post(
  "/",
  verifyToken,
  isHR,
  upload.single("image"),
  createJob
);

// ✅ READ JOBS (USER & HR)
router.get("/", verifyToken, getAllJobs);
router.get("/:id", verifyToken, getJobById);

// ✅ UPDATE JOB (HR ONLY)
router.put(
  "/:id",
  verifyToken,
  isHR,
  upload.single("image"),
  updateJob
);

// ✅ DELETE JOB (HR ONLY)
router.delete(
  "/:id",
  verifyToken,
  isHR,
  deleteJob
);

module.exports = router;
