import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";


export const uploadImageToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
                overwrite: true,
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        Readable
            .from(buffer)
            .pipe(uploadStream);
    });

};


export const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) return;
    return await cloudinary.uploader.destroy(publicId);

};