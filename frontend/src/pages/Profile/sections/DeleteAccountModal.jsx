import { useState } from "react";
import { AlertTriangle,  X,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@components/ui/Button/Button.jsx";

export default function DeleteAccountModal({ open, onClose,}) {
    const [text, setText] = useState("");
    const canDelete = text === "DELETE";
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-50
                        bg-black/70
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        p-5
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: .9,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: .9,
                            y: 20
                        }}
                        className="
                            bg-bg-surface
                            border
                            border-white/10
                            rounded-2xl
                            p-8
                            w-full
                            max-w-lg
                        "
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-red-500/10
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <AlertTriangle
                                        size={22}
                                        className="text-red-400"
                                    />
                                </div>
                                <div>
                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                            text-white
                                        "
                                    >
                                        Delete Account
                                    </h2>
                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-2
                                        "
                                    >
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose}>
                                <X
                                    size={20}
                                    className="text-gray-500"
                                />
                            </button>
                        </div>
                        <div
                            className="
                                mt-8
                                rounded-xl
                                border
                                border-red-500/20
                                bg-red-500/5
                                p-4
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    text-gray-300
                                    leading-7
                                "
                            >
                                Type
                                <strong className="text-red-400">
                                    {" "}DELETE{" "}
                                </strong>
                                below to permanently delete your account.
                            </p>
                        </div>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type DELETE"
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-bg-base
                                px-4
                                py-3
                                outline-none
                                text-white
                            "
                        />
                        <div
                            className="
                                mt-8
                                flex
                                justify-end
                                gap-3
                            "
                        >
                            <Button
                                variant="secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!canDelete}
                                className="
                                    bg-red-500
                                    hover:bg-red-600
                                    disabled:opacity-40
                                "
                                onClick={() => {
                                    // Backend integration
                                    // will be added later.
                                    console.log(
                                        "Delete Account"
                                    );
                                }}
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