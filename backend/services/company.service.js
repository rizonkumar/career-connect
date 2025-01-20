import AppError from "../errors/AppError.js";
import Company from "../models/company.model.js";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/job.model.js";

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
    const jobs = await Job.find({ companyId });
    if (!jobs) {
      throw new AppError("No jobs found for this company", 404);
    }
    return jobs;
  }

  async changeJobVisibility(id, companyId) {
    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    return await job.save();
  }
}
