import { Router } from "express";
import { uploadAvatarController, deleteAvatarController,deleteAccountController,getProfileController,} from "../controllers/profile.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import avatarUpload from "../middlewares/avatarUpload.middleware.js";

const profileRouter = Router();

profileRouter.get( "/", authUser, getProfileController);

profileRouter.post( "/avatar", authUser, avatarUpload.single("avatar"), uploadAvatarController);

profileRouter.delete( "/avatar", authUser, deleteAvatarController);

//  Delete user account 
profileRouter.delete( "/", authUser,deleteAccountController);

export default profileRouter;