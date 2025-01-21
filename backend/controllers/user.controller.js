import JobApplication from "../models/jobapplication.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get User Data
export const getUserData = async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      message: "User data retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Apply for Job
export const applyForJob = async (req, res, next) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({
      jobId,
      userId,
    });

    if (isAlreadyApplied.length > 0) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.status(200).json({
      message: "Job application submitted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Applied Applications
export const getUserAppliedApplications = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User applied applications retrieved successfully",
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Update User Profile - Resume Only
export const updateUserResume = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.resumeFile;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const uploadResume = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = uploadResume.secure_url;
    }

    await userData.save();

    return res.status(200).json({
      message: "User Resume updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
