import api from "./api";
import { API } from "@constants/api";


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

    formData.append("resume", file);
    formData.append("selfDescription", selfDescription || "");
    formData.append("jobDescription", jobDescription || "");

    const { data } = await api.post(API.INTERVIEW.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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