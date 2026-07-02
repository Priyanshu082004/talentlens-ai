import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { uploadImageToCloudinary, deleteImageFromCloudinary,} from "../utils/cloudinary.js";

export const uploadAvatarController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Avatar image is required.");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  if (user.avatarPublicId) {
    await deleteImageFromCloudinary(user.avatarPublicId);
  }
  const uploadedImage = await uploadImageToCloudinary(
    req.file.buffer,
    "TalentLens-AI/avatars"
  );
  user.avatar = uploadedImage.secure_url;
  user.avatarPublicId = uploadedImage.public_id;
  await user.save();
  return res.status(200).json({
    message: "Avatar uploaded successfully.",
    user: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

export const deleteAvatarController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.avatarPublicId) {
    await deleteImageFromCloudinary(user.avatarPublicId);
  }

  user.avatar = "";
  user.avatarPublicId = "";

  await user.save();

  return res.status(200).json({
    message: "Avatar removed successfully.",
    user: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      avatar: "",
    },
  });
});

export const deleteAccountController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  if (user.avatarPublicId) {
    await deleteImageFromCloudinary(user.avatarPublicId);
  }
  await interviewReportModel.deleteMany({
    user: req.user._id,
  });
  await User.findByIdAndDelete(req.user._id);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "Account deleted successfully.",
  });
});

export const getProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -avatarPublicId"
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    message: "Profile fetched successfully.",
    user,
  });
});




//  one file for all profile controllers: upload avatar, delete avatar, delete account, get profile. can add more controllers here if needed.