import { User } from "../models/user.model.js";
import tokenBlacklistModel from "../models/blacklist.model.js";

import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


export const registerUserController = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  if (!username || !email || !password || !fullName) {
    throw new ApiError(
      400,
      "Please provide fullName, username, email and password."
    );
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists with this email or username."
    );
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });
});


export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(200).json({
    message: "User logged in successfully.",
    user: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });
});

export const logoutUserController = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    await tokenBlacklistModel.create({
      token: accessToken,
    });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "User logged out successfully.",
  });
});

export const getMeController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res.status(200).json({
    message: "User fetched successfully.",
    user,
  });
});





//  one file for all auth controllers: register, login, logout, getMe. can add refresh token controller here too.