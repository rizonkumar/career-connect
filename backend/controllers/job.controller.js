import { JobService } from "../services/job.service.js";

const jobService = new JobService();

// Post a new job
export const postNewJob = async (req, res, next) => {
  try {
    const { title, description, location, category, level, salary } = req.body;
    const companyId = req.company._id;

    if (!title || !description || !location || !category || !level || !salary) {
      throw new AppError("Missing required job fields", 400);
    }

    const jobData = {
      title,
      description,
      location,
      category,
      level,
      salary,
    };
    const newJob = await jobService.postJob(jobData, companyId);

    res
      .status(201)
      .json({ message: "Job created successfully", sucess: true, job: newJob });
  } catch (error) {
    next(error);
  }
};

// get a single job by id
export const getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobService.getSingleJob(id);
    if (!job) {
      throw new AppError("Job not found", 404);
    }
    res
      .status(200)
      .json({ message: "Job retrieved successfully", success: true, job });
  } catch (error) {
    next(error);
  }
};

// get all jobs data
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs();
    res.status(200).json({
      message: "All jobs retrieved successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};
