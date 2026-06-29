import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Thin wrapper around react-hot-toast with TalentLensAI-branded icons.
 * The global <Toaster /> styling lives in main.jsx; this module
 * just exposes consistent helper functions to call from anywhere.
 */
export const Toast = {
  success: (message) =>
    toast.success(message, { icon: <CheckCircle size={18} className="text-emerald-400" /> }),

  error: (message) =>
    toast.error(message, { icon: <XCircle size={18} className="text-red-400" /> }),

  info: (message) =>
    toast(message, { icon: <Info size={18} className="text-primary-400" /> }),

  warning: (message) =>
    toast(message, { icon: <AlertTriangle size={18} className="text-amber-400" /> }),

  promise: (promise, messages) =>
    toast.promise(promise, {
      loading: messages?.loading || 'Working on it…',
      success: messages?.success || 'Done!',
      error:   messages?.error   || 'Something went wrong.',
    }),
};


