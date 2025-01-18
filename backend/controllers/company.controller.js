import { CompanyService } from "../services/company.service.js";
import generateToken from "../utils/generateToken.js";

const companyService = new CompanyService();

// Register Company
export const registerCompany = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    const company = await companyService.registerCompany(
      name,
      email,
      password,
      imageFile
    );

    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    next(error);
  }
};

// Company login
export const loginCompany = async (req, res) => {
  try {
  } catch (error) {}
};

// Get company profile
export const getCompanyProfile = async (req, res) => {
  try {
  } catch (error) {}
};

// Post a new job
export const postNewJob = async (req, res) => {
  try {
  } catch (error) {}
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
