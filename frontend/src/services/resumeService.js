import api from "./api";
import { API } from "@constants/api.js";


const resumeService = {
  /**
   * Upload resume PDF + meta and trigger Gemini analysis.
   * @param {File} file
   * @param {string} selfDescription
   * @param {string} jobDescription
   * @param {(progress: number) => void} onProgress
   * @returns {Promise<{message: string, interviewReport: object}>}
   */
  async analyzeResume(file, selfDescription, jobDescription, onProgress) {
    const formData = new FormData();

    formData.append("resume", file, file?.name || "resume.pdf");
    formData.append("selfDescription", selfDescription || "");
    formData.append("jobDescription", jobDescription || "");

    const { data } = await api.post(API.INTERVIEW.CREATE, formData, {
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress);
        }
      },
    });

    return data;
  },

  /**
   * Get all interview reports for the logged-in user.
   * @returns {Promise<{message: string, interviewReports: Array}>}
   */
  async getHistory() {
    const { data } = await api.get(API.INTERVIEW.LIST);
    return data;
  },

  /**
   * Get a single interview report.
   * @param {string} id
   * @returns {Promise<{message: string, interviewReport: object}>}
   */
  async getById(id) {
    const { data } = await api.get(API.INTERVIEW.BY_ID(id));
    return data;
  },

  /**
   * Download the AI-generated resume PDF.
   * @param {string} id
   * @returns {Promise<Blob>}
   */
  async downloadResumePdf(id) {
    const { data } = await api.post(
      API.INTERVIEW.PDF(id),
      {},
      {
        responseType: "blob",
      }
    );

    return data;
  },
};

export default resumeService;



// This code defines a `resumeService` object that provides methods for handling resume-related operations in a web application.
// It uses an Axios instance (`api`) to make HTTP requests to the backend API endpoints defined in the `API` constant. 
// The service includes methods for uploading and analyzing resumes, fetching the user's interview history, fetching a specific interview report by ID, 
// and downloading the AI-generated resume PDF. Each method returns the response data from the corresponding API call, allowing other parts of the 
// application to interact with the resume analysis system easily.  