import express from "express";
import {
  getCompanyProfile,
  loginCompany,
  registerCompany,
} from "../controllers/company.controller.js";
import { postNewJob } from "../controllers/job.controller.js";
import upload from "../config/multer.js";
import {
  validateCompanyLogin,
  validateCompanyRegistration,
} from "../middleware/validators/company.validator.js";
import { protectCompany } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validateCompanyRegistration,
  registerCompany
);
router.post("/login", validateCompanyLogin, loginCompany);
router.get("/company-profile", protectCompany, getCompanyProfile);
router.post("/post-new-job", protectCompany, postNewJob);
// router.post("/applications", protectCompany, getJobApplicants);
// router.get("/posted-jobs", protectCompany, getCompanyPostedJobs);
// router.post("/change-status", protectCompany, changeJobApplicationStatus);
// router.post("/change-visibility", protectCompany, changeJobVisibility);

export default router;
