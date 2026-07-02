import { Router } from "express";
import { uploadAvatarController, deleteAvatarController,deleteAccountController,getProfileController,} from "../controllers/profile.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import avatarUpload from "../middlewares/avatarUpload.middleware.js";

const profileRouter = Router();

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private 
profileRouter.get( "/", authUser, getProfileController);
// @route   POST /api/profile/avatar
// @desc    Upload user avatar
// @access  Private
profileRouter.post( "/avatar", authUser, avatarUpload.single("avatar"), uploadAvatarController);
// @route   DELETE /api/profile/avatar
// @desc    Delete user avatar
// @access  Private
profileRouter.delete( "/avatar", authUser, deleteAvatarController);

// @route   DELETE /api/profile
// @desc    Delete user account
// @access  Private
profileRouter.delete( "/", authUser,deleteAccountController);

export default profileRouter;