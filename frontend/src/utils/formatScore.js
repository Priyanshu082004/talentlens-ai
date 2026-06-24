/**
 * Returns a colour string based on an ATS / readiness score.
 * @param {number} score  0–100
 */
export const scoreColor = (score) => {
  if (score >= 80) return '#10B981'; // emerald
  if (score >= 60) return '#F59E0B'; // amber
  return '#EF4444';                  // red
};

/**
 * Returns a Tailwind text-colour class for a score.
 */
export const scoreTextClass = (score) => {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-amber-400';
  return 'text-red-400';
};

/**
 * Returns a label like "Good", "Fair", "Weak" for a score.
 */
export const scoreLabel = (score) => {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Weak';
  return 'Poor';
};

/**
 * Formats a date string to a readable format.
 * @param {string|Date} date
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Formats a date string to a readable date + time.
 */
export const formatDateTime = (date) =>
  new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
