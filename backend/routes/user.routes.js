import express from "express";
import {
  applyForJob,
  getUserAppliedApplications,
  getUserData,
  updateUserResume,
} from "../controllers/user.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/user", getUserData);

router.post("/apply", applyForJob);

router.get("/applications", getUserAppliedApplications);

router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
