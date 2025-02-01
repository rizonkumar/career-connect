import AppError from "../errors/AppError.js";
import Company from "../models/company.model.js";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/job.model.js";
import JobApplication from "../models/jobapplication.model.js";

export class CompanyService {
  async registerCompany(name, email, password, imageFile) {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      throw new AppError("Company already registered!", 409);
    }

    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(password, salt);
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);

      const company = await Company.create({
        name,
        email,
        password: hashedPassword,
        image: imageUpload.secure_url,
      });

      return company;
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Email already exists", 409);
      }
      throw new AppError("Error creating company", 500);
    }
  }

  async loginCompany(email, password) {
    const company = await Company.findOne({ email });
    if (!company) {
      throw new AppError("Invalid email or password", 401);
    }
    const isPasswordMatch = await bycrypt.compare(password, company.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    return company;
  }

  async getProfile(companyId) {
    const company = await Company.findById(companyId).select("-password");

    if (!company) {
      throw new AppError("Company not found", 404);
    }
    return company;
  }

  async getCompanyPostedJobs(companyId) {
    try {
      const jobs = await Job.find({ companyId });
      if (!jobs) {
        throw new AppError("No jobs found for this company", 404);
      }

      const jobsWithApplicants = await Promise.all(
        jobs.map(async (job) => {
          const applications = await JobApplication.find({ jobId: job._id });

          const jobObj = job.toObject();
          jobObj.applicantsCount = applications.length;

          return jobObj;
        })
      );

      return jobsWithApplicants;
    } catch (error) {
      throw new AppError("Error fetching company jobs", 500);
    }
  }

  async changeJobVisibility(id, companyId) {
    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    return await job.save();
  }

  async deleteJob(jobId, companyId) {
    try {
      const job = await Job.findById(jobId);

      if (!job) {
        throw new AppError("Job not found", 404);
      }

      if (job.companyId.toString() !== companyId.toString()) {
        throw new AppError("Not authorized to delete this job", 403);
      }

      await JobApplication.deleteMany({ jobId });

      await Job.findByIdAndDelete(jobId);

      return true;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
