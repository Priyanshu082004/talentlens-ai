import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const avatarUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith("image/")) {
            return cb(
                new ApiError(
                    400,
                    "Only image files are allowed."
                )
            );
        }
        cb(null, true);
    },
});

export default avatarUpload;


// middleware for handling avatar uploads using multer. It sets up a memory storage for the uploaded files,
//  limits the file size to 5MB, and filters the files to only allow image types. If a non-image file is uploaded,
//  it throws an ApiError with a 400 status code and an appropriate message.