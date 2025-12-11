const Application = require("../models/Application");
const JobCategory = require("../models/JobCategory");

/**
 * USER APPLY JOB
 * CV akan disimpan di: uploads/cv
 */
exports.applyJob = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { jobCategoryId } = req.body;

    // validasi file
    if (!req.file) {
      return res.status(400).json({ message: "CV wajib diupload (PDF)" });
    }

    // job category
    const job = await JobCategory.findById(jobCategoryId);
    if (!job) {
      return res.status(404).json({ message: "Job category tidak ditemukan" });
    }

    // user tidak boleh apply 2x
    const exists = await Application.findOne({
      jobCategoryId,
      userId
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Anda sudah melamar job ini" });
    }

    // simpan application
    const application = await Application.create({
      userId,
      jobCategoryId,
      cv: req.file.path
    });

    // tambah jumlah applicant
    job.applicant += 1;
    await job.save();

    res.status(201).json({
      message: "Apply job berhasil",
      application
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * HR MELIHAT APPLICANT BERDASARKAN JOB
 */
exports.getApplicantsByJob = async (req, res) => {
  try {
    const { jobCategoryId } = req.params;

    const applications = await Application.find({ jobCategoryId })
      .populate("userId", "name email")
      .populate("jobCategoryId", "job_name");

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * USER MELIHAT RIWAYAT LAMARAN
 */
exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await Application.find({ userId })
      .populate("jobCategoryId", "job_name category");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
