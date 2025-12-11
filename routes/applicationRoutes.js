const express = require("express");
const router = express.Router();
const multer = require("multer");

const { verifyToken } = require("../middleware/auth");
const { isUser } = require("../middleware/role");
const applicationController = require("../controllers/applicationController");

// ============================
// ✅ MULTER CONFIG (UPLOAD CV)
// ============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cv"); // folder CV
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// (optional) hanya PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("CV harus berupa PDF"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// ============================
// ✅ ROUTES
// ============================

// ✅ APPLY JOB (USER ONLY)
router.post(
  "/apply",
  verifyToken,              // cek login
  isUser,                   // cek role user
  upload.single("cv"),      // upload CV
  applicationController.applyJob
);

// USER MELIHAT RIWAYAT LAMARAN
router.get(
  "/my-applications",
  verifyToken,
  isUser,
  applicationController.getMyApplications
);


module.exports = router;
