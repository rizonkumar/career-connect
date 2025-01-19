import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import Company from "../models/company.model.js";

export const protectCompany = async (req, res, next) => {
  try {
    // get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("No token, authorization denied", 401);
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get company from token
    const company = await Company.findById(decoded.id).select("-password");

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    req.company = company;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 401);
    }
    next(error);
  }
};
