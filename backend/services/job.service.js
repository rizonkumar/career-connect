import AppError from "../errors/AppError.js";
import Job from "../models/job.model.js";

export class JobService {
  async postJob(jobData, companyId) {
    console.log("Job Data from Service: ", jobData);
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
}
