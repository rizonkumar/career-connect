import { UserService } from "../services/user.service.js";

const userService = new UserService();

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const user = await userService.getUserProfile(userId);

    res.status(200).json({
      message: "User data retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    await userService.applyForJob(userId, jobId);

    res.status(200).json({
      message: "Job application submitted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAppliedApplications = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const applications = await userService.getUserApplications(userId);

    res.status(200).json({
      message: "User applied applications retrieved successfully",
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserResume = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    await userService.updateResume(userId, resumeFile);

    res.status(200).json({
      message: "User Resume updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
