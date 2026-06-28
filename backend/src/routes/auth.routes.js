import { Router } from "express";

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} from "../controllers/auth.controller.js";

import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout current user
 * @access  Private
 */
authRouter.post("/logout", authUser, logoutUserController);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user details
 * @access  Private
 */
authRouter.get("/me", authUser, getMeController);

export default authRouter;