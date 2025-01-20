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
export const loginCompany = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const company = await companyService.loginCompany(email, password);
    res.status(201).json({
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

// Get company profile
export const getCompanyProfile = async (req, res, next) => {
  try {
    const company = await companyService.getProfile(req.company._id);

    res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get company posted jobs
export const getCompanyPostedJobs = async (req, res, next) => {
  try {
    const companyId = req.company._id;
    const jobs = await companyService.getCompanyPostedJobs(companyId);
    // TODO: Adding No of applicants info in data after creating apply for job api
    res.status(200).json({
      success: true,
      jobsData: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const changeJobVisibility = async (req, res, next) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await companyService.changeJobVisibility(id, companyId);
    return res.status(200).json({
      success: true,
      job: job,
    });
  } catch (error) {
    next(error);
  }
};
