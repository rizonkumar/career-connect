import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import JobApplication from "../models/jobapplication.model.js";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../errors/AppError.js";

export class UserService {
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async applyForJob(userId, jobId) {
    const isAlreadyApplied = await JobApplication.findOne({
      jobId,
      userId,
    });

    if (isAlreadyApplied) {
      throw new AppError("You have already applied for this job", 400);
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      throw new AppError("Job not found", 404);
    }

    const application = await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return application;
  }

  async getUserApplications(userId) {
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      throw new AppError("No applications found", 404);
    }

    return applications;
  }

  async updateResume(userId, resumeFile) {
    const userData = await User.findById(userId);
    if (!userData) {
      throw new AppError("User not found", 404);
    }

    if (resumeFile) {
      const uploadResume = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = uploadResume.secure_url;
      await userData.save();
    }

    return userData;
  }
}
