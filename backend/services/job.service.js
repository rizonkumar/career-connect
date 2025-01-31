import AppError from "../errors/AppError.js";
import Job from "../models/job.model.js";

export class JobService {
  async postJob(jobData, companyId) {
    try {
      const newJob = await Job.create({
        ...jobData,
        companyId,
        date: Date.now(),
        visible: true,
      });
      console.log("New Job: ", newJob);
      return newJob;
    } catch (error) {
      throw new AppError("Error creating job posting", 500);
    }
  }

  async getJobs() {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    return jobs;
  }

  async getSingleJob(id) {
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    return job;
  }
}
