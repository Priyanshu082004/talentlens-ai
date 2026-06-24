const ACCEPTED_TYPE  = 'application/pdf';
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates a File object for upload.
 * @param {File} file
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateResumeFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected.' };
  if (file.type !== ACCEPTED_TYPE) return { valid: false, error: 'Only PDF files are accepted.' };
  if (file.size > MAX_SIZE_BYTES)  return { valid: false, error: 'File must be under 5 MB.' };
  return { valid: true, error: null };
};

/**
 * Returns a human-readable file size string.
 * @param {number} bytes
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
