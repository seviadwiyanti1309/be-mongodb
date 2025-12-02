const JobCategory = require("../models/JobCategory");

//create 
exports.createJob = async (req, res) => {
    try {
        const { job_name, description, category, applicant } = req.body;

        const image = req.file ? req.file.path : null;
        
        const jobCategory = await JobCategory.create({
            job_name,
            description,
            category,
            applicant,
            image
        });

        res.json({ message: "Job category created successfully", jobCategory });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// get all 
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await JobCategory.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// get by id
exports.getJobById = async (req, res) => {
    try {
        const job = await JobCategory.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job category not found" });
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// update
exports.updateJob = async (req, res) => {
    try {

        const updates = req.body;
        if (req.file) {
            updates.image = req.file.path;
        }

        const job = await JobCategory.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: "Job category not found" });
        }

        res.json({ message: "Job category updated successfully", job });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

//delete
exports.deleteJob = async (req, res) => {
    try {
        const job = await JobCategory.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job category not found" });
        }
        res.json({ message: "Job category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};