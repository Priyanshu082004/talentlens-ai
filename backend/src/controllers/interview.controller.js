
import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const getAuthenticatedUserId = (req) => req.user?._id || req.user?.id;

const getScopedReportsForUser = async (userId) => {
  const ownedReports = await interviewReportModel
    .find({ user: userId })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
    );

  if (ownedReports.length > 0) {
    return ownedReports;
  }

  const legacyReports = await interviewReportModel
    .find({
      $or: [{ user: { $exists: false } }, { user: null }],
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
    );

  if (legacyReports.length === 0) {
    return [];
  }

  const hasAnyOwnedReports = await interviewReportModel.exists({
    user: { $ne: null, $exists: true },
  });

  if (hasAnyOwnedReports) {
    return [];
  }

  await interviewReportModel.updateMany(
    {
      _id: { $in: legacyReports.map((report) => report._id) },
    },
    { $set: { user: userId } }
  );

  return legacyReports.map((report) => ({ ...report.toObject(), user: userId }));
};

const getLegacyReportForUser = async (interviewId, userId) => {
  const ownedReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: userId,
  });

  if (ownedReport) {
    return ownedReport;
  }

  const legacyReport = await interviewReportModel.findOne({
    _id: interviewId,
    $or: [{ user: { $exists: false } }, { user: null }],
  });

  if (!legacyReport) {
    return null;
  }

  const hasAnyOwnedReports = await interviewReportModel.exists({
    user: { $ne: null, $exists: true },
  });

  if (hasAnyOwnedReports) {
    return null;
  }

  await interviewReportModel.findByIdAndUpdate(interviewId, { user: userId });

  return interviewReportModel.findById(interviewId);
};

/**
 * ---------------------------------------------------------
 * Generate Interview Report
 * POST /api/interview
 * ---------------------------------------------------------
 */
export const generateInterViewReportController = asyncHandler(async (req, res) => {

  const parser = new PDFParse(Uint8Array.from(req.file.buffer));
  const resumeContent = await parser.getText();

  const { selfDescription, jobDescription } = req.body;

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  
  console.log("========== AI RESPONSE ==========");
  console.dir(interViewReportByAi, { depth: null });
  console.log("================================");

  const userId = getAuthenticatedUserId(req);

  const interviewReport = await interviewReportModel.create({
    user: userId,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportByAi,
  });

  console.log("========== SAVED REPORT ==========");
  console.log(interviewReport._id);
  console.log("=================================");

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
});

/**
 * ---------------------------------------------------------
 * Get Interview Report by ID
 * GET /api/interview/:interviewId
 * ---------------------------------------------------------
 */
export const getInterviewReportByIdController = asyncHandler(async (req, res) => {

  const { interviewId } = req.params;
  const userId = getAuthenticatedUserId(req);

  const interviewReport = await getLegacyReportForUser(interviewId, userId);

  if (!interviewReport) {
    throw new ApiError(404, "Interview report not found.");
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport,
  });
});

/**
 * ---------------------------------------------------------
 * Get All Reports
 * GET /api/interview
 * ---------------------------------------------------------
 */
export const getAllInterviewReportsController = asyncHandler(async (req, res) => {

  const userId = getAuthenticatedUserId(req);

  const interviewReports = await getScopedReportsForUser(userId);

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
});

/**
 * ---------------------------------------------------------
 * Generate ATS Resume PDF
 * POST /api/interview/:interviewId/resume
 * ---------------------------------------------------------
 */
export const generateResumePdfController = asyncHandler(async (req, res) => {

  const { interviewId } = req.params;
  const userId = getAuthenticatedUserId(req);

  console.log("========== PDF REQUEST ==========");
  console.log("Params:", req.params);
  console.log("Interview ID:", interviewId);

  const interviewReport = await getLegacyReportForUser(interviewId, userId);

  console.log("Interview Report Found:", !!interviewReport);

  if (!interviewReport) {
    throw new ApiError(404, "Interview report not found.");
  }

  const { resume, selfDescription, jobDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
  });

  res.send(pdfBuffer);
});





//  one file for all interview controllers: generate report, get report by ID, get all reports, generate resume PDF.can add more controllers here if needed.