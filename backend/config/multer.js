import multer from "multer";
import AppError from "../errors/AppError.js";

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new AppError("Please upload only images", 400), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
