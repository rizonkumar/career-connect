import { JobService } from "../services/job.service.js";

const jobService = new JobService();

// Post a new job
export const postNewJob = async (req, res) => {
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

// get company job applicants
export const getJobApplicants = async (req, res) => {
  try {
  } catch (error) {}
};

// get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
  } catch (error) {}
};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {
  try {
  } catch (error) {}
};

// change job visibility
export const changeJobVisibility = async (req, res) => {
  try {
  } catch (error) {}
};
