import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button/Button.jsx";
import { Toast } from "@components/ui/Toast/Toast.jsx";
import profileService from "@services/profileService.js";
import { clearAuth} from "@redux/slices/authSlice.js";
import { ROUTES } from "@constants/routes.js";

export default function DeleteAccountModal({  open, onClose,}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const canDelete = text === "DELETE";
  const handleClose = () => {
    setText("");
    onClose();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await profileService.deleteAccount();
      dispatch(clearAuth());
    //   dispatch(logoutUser());
      Toast.success("Account deleted successfully.");
      navigate(ROUTES.HOME);
    }
    catch (error) {
      Toast.error(
        error?.response?.data?.message ||
        "Failed to delete account."
      );
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           className=" fixed inset-0   z-50   bg-black/70   backdrop-blur-sm   flex items-center justify-center p-5">
       <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            className=" bg-bg-surface border border-white/10 rounded-2xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="  w-12  h-12  rounded-xl  bg-red-500/10  flex items-center justify-center" >
                  <AlertTriangle size={22} className="text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Delete Account
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button onClick={handleClose}>
                <X size={20} className="text-gray-500 hover:text-white transition-colors" />
              </button>
            </div>
            <div className="  mt-8 rounded-xl border border-red-500/20 bg-red-500/5  p-4 " >
              <p className="text-sm text-gray-300 leading-7">
                Type
                <strong className="text-red-400">
                {" "}DELETE{" "}
                </strong>
                below to permanently delete your account.
              </p>
            </div>
            <input value={text}  onChange={(e) => setText(e.target.value)}placeholder="Type DELETE" 
            className=" mt-6 w-full rounded-xl border border-white/10 bg-bg-base px-4 py-3 outline-none text-white focus:border-red-400"/>
            <div className="mt-8 flex justify-end gap-3">
              <Button  variant="secondary"   onClick={handleClose} disabled={loading} >
                Cancel
              </Button>

              <Button

                loading={loading}

                disabled={!canDelete || loading}

                onClick={handleDelete}

                className="
                  bg-red-500
                  hover:bg-red-600
                  disabled:opacity-40
                "

              >

                Delete Account

              </Button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}