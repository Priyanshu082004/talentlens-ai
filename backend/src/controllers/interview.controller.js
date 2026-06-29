// import { PDFParse } from "pdf-parse";
// import {
//   generateInterviewReport,
//   generateResumePdf,
// } from "../services/ai.service.js";
// import interviewReportModel from "../models/interviewReport.model.js";
// import { asyncHandler } from "../utils/AsyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";


// export const generateResumePdfController = asyncHandler(async (req, res) => {

//   const { interviewId } = req.params;

//   const interviewReport = await interviewReportModel.findById(interviewId);

//   if (!interviewReport) {
//     throw new ApiError(404, "Interview report not found.");
//   }

//   const { resume, selfDescription, jobDescription } = interviewReport;

//   const pdfBuffer = await generateResumePdf({
//     resume,
//     selfDescription,
//     jobDescription,
//   });

//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
//   });

//   res.send(pdfBuffer);
// });

// export const getInterviewReportByIdController = asyncHandler(async (req, res) => {

//   const { interviewId } = req.params;

//   const interviewReport = await interviewReportModel.findOne({
//     _id: interviewId,
//     user: req.user.id,
//   });

//   if (!interviewReport) {
//     throw new ApiError(404, "Interview report not found.");
//   }

//   res.status(200).json({
//     message: "Interview report fetched successfully.",
//     interviewReport,
//   });
// });

// export const getAllInterviewReportsController = asyncHandler(async (req, res) => {

//   const interviewReports = await interviewReportModel.find({
//     user: req.user.id,
//   })
//   .sort({ createdAt: -1 })
//   .select(
//     "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
//   );

//   res.status(200).json({
//     message: "Interview reports fetched successfully.",
//     interviewReports,
//   });
// });

// export const generateResumePdfController = asyncHandler(async (req, res) => {

//   const { interviewReportId } = req.params;

//   const interviewReport = await interviewReportModel.findById(
//     interviewReportId
//   );

//   if (!interviewReport) {
//     throw new ApiError(404, "Interview report not found.");
//   }

//   const { resume, selfDescription, jobDescription } = interviewReport;

//   const pdfBuffer = await generateResumePdf({
//     resume,
//     selfDescription,
//     jobDescription,
//   });

//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
//   });

//   res.send(pdfBuffer);
// });




import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

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

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
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

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

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

  const interviewReports = await interviewReportModel.find({
    user: req.user.id,
  })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
    );

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

  console.log("========== PDF REQUEST ==========");
  console.log("Params:", req.params);
  console.log("Interview ID:", interviewId);

  const interviewReport = await interviewReportModel.findById(interviewId);

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