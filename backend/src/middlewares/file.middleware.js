import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 3 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new ApiError(400, "Only PDF files are allowed."));
    }

    cb(null, true);
  },
});

export default upload;


//  middleware for handling pdf uploads using multer.
// previous one was  for phots this one is for pdfs. 
