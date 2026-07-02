import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const authUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Token not provided.");
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({
    token,
  });

  if (isTokenBlacklisted) {
    throw new ApiError(401, "Token is invalid.");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);

  req.user = decoded;

  next();
});


//  This middleware function `authUser` is used to authenticate users based on a JWT token. 
// It checks for the presence of a token in the request cookies, verifies if the token is blacklisted, and decodes the token to attach the user
//  information to the request object. If any of these checks fail, it throws an appropriate error.