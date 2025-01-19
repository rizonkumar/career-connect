// TODO: We will use the validator middleware later ON.

import AppError from "../../errors/AppError.js";

export const validateJobCreation = (req, res, next) => {
  const { title, description, location, category, level, salary } = req.body;

  // Check for required fields
  if (!title || !description || !location || !category || !level || !salary) {
    throw new AppError("Missing required fields", 400);
  }

  // Validate title length
  if (title.length < 3 || title.length > 100) {
    throw new AppError("Title must be between 3 and 100 characters", 400);
  }

  // Validate description length
  if (description.length < 10 || description.length > 5000) {
    throw new AppError(
      "Description must be between 10 and 5000 characters",
      400
    );
  }

  // Validate salary
  if (typeof salary !== "number" || salary <= 0) {
    throw new AppError("Salary must be a positive number", 400);
  }

  // Validate category
  const validCategories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Other",
  ];
  if (!validCategories.includes(category)) {
    throw new AppError("Invalid job category", 400);
  }

  // Validate experience level
  const validLevels = ["Entry", "Mid", "Senior", "Lead", "Executive"];
  if (!validLevels.includes(level)) {
    throw new AppError("Invalid experience level", 400);
  }

  next();
};

export const validateJobUpdate = (req, res, next) => {
  const updates = req.body;
  const allowedUpdates = [
    "title",
    "description",
    "location",
    "category",
    "level",
    "salary",
    "visible",
  ];

  // Check if updates contain valid fields
  const invalidUpdates = Object.keys(updates).filter(
    (update) => !allowedUpdates.includes(update)
  );

  if (invalidUpdates.length > 0) {
    throw new AppError(`Invalid updates: ${invalidUpdates.join(", ")}`, 400);
  }

  // If salary is being updated
  if (
    updates.salary &&
    (typeof updates.salary !== "number" || updates.salary <= 0)
  ) {
    throw new AppError("Salary must be a positive number", 400);
  }

  // If visible status is being updated
  if (updates.visible !== undefined && typeof updates.visible !== "boolean") {
    throw new AppError("Visible status must be a boolean", 400);
  }

  next();
};
