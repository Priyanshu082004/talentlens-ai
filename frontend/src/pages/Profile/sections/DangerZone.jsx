import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import GlassCard from "@components/ui/GlassCard/GlassCard.jsx";
import Button from "@components/ui/Button/Button.jsx";
import DeleteAccountModal from "@pages/Profile/sections/DeleteAccountModal.jsx";

export default function DangerZone() {
    const [open, setOpen] = useState(false);
    return (
        <GlassCard>
            <div className="flex items-start gap-4">
                <div
                    className="
                        w-12
                        h-12
                        rounded-xl
                        bg-red-500/10
                        flex
                        items-center
                        justify-center
                        shrink-0
                    "
                >
                    <AlertTriangle
                        size={24}
                        className="text-red-400"
                    />
                </div>
                <div className="flex-1"> 
                     <h2
                        className="
                            font-display
                            text-xl
                            font-bold
                            text-red-400
                        "
                    >
                        Danger Zone
                    </h2>
                    <p
                        className="
                            text-sm
                            text-slate-500
                            mt-2
                            leading-7
                        "
                    >
                        Deleting your account permanently removes all
                        your information from TalentLens AI.
                    </p>
                    <ul
                        className="
                            mt-5
                            space-y-2
                            text-sm
                            text-slate-500
                        "
                    >
                        <li>• Profile Information</li>
                        <li>• Avatar Image</li>
                        <li>• Resume Analysis History</li>
                        <li>• AI Interview Reports</li>
                        <li>• Generated ATS Resume PDFs</li>
                    </ul>
                    <Button
                        className="mt-8"
                        variant="ghost"
                        onClick={() => setOpen(true)}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
            <DeleteAccountModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </GlassCard>
    );
}