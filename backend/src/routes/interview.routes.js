import { Router } from "express";

import {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";

import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = Router();

/**
 * @route   POST /api/interview
 * @desc    Generate a new interview report
 * @access  Private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterViewReportController
);

/**
 * @route   GET /api/interview
 * @desc    Get all interview reports of logged-in user
 * @access  Private
 */
interviewRouter.get(
  "/",
  authUser,
  getAllInterviewReportsController
);

/**
 * @route   GET /api/interview/:interviewId
 * @desc    Get interview report by ID
 * @access  Private
 */
interviewRouter.get(
  "/:interviewId",
  authUser,
  getInterviewReportByIdController
);

/**
 * @route   POST /api/interview/:interviewId/resume
 * @desc    Generate ATS-optimized resume PDF
 * @access  Private
 */
interviewRouter.post(
  "/:interviewId/resume",
  authUser,
  generateResumePdfController
);

export default interviewRouter;