import express from "express";
import {
  changeJobApplicationStatus,
  changeJobVisibility,
  getCompanyPostedJobs,
  getCompanyProfile,
  getJobApplicants,
  loginCompany,
  postNewJob,
  registerCompany,
} from "../controllers/company.controller.js";
import upload from "../config/multer.js";
import {
  validateCompanyLogin,
  validateCompanyRegistration,
} from "../middleware/validators/company.validator.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validateCompanyRegistration,
  registerCompany
);
router.post("/login", validateCompanyLogin, loginCompany);
router.get("/company-profile", getCompanyProfile);
router.post("/post-new-job", postNewJob);
router.post("/applications", getJobApplicants);
router.get("/posted-jobs", getCompanyPostedJobs);
router.post("/change-status", changeJobApplicationStatus);
router.post("/change-visibility", changeJobVisibility);

export default router;
