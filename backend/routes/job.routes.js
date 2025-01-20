import express from "express";
import { protectCompany } from "../middleware/auth.middleware.js";
import {
  getAllJobs,
  getSingleJob,
  postNewJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post-new-job", protectCompany, postNewJob);

// Route to get a single job data
router.get("/job/:id", getSingleJob);

// Route to get all jobs data
router.get("/", getAllJobs);

export default router;
