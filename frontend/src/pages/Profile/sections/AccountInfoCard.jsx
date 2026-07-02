import { User, Mail, BadgeCheck,} from "lucide-react";
import GlassCard from "@components/ui/GlassCard/GlassCard.jsx";

export default function AccountInfoCard({ user }) {

  return (

    <GlassCard>
      <div className="mb-8">
     <h2 className="font-display text-xl font-bold text-slate-900">
          Account Information
        </h2>
        <p className="text-sm text-slate-500 mt-2">These details are managed by your account and are currently read-only  </p>
      </div>

      <div className="space-y-6">
        <InfoRow
          icon={<User size={18} />}
          label="Full Name"
          value={user?.fullName || "--"}
        />
        <InfoRow
          icon={<BadgeCheck size={18} />}
          label="Username"
          value={user?.username || "--"}
        />
        <InfoRow
          icon={<Mail size={18} />}
          label="Email Address"
          value={user?.email || "--"}
        />
      </div>
      <div
        className="
          mt-8
          rounded-xl
          border
          border-primary-500/20
          bg-primary-500/5
          p-4
        "
      >
        <p className="text-sm leading-7 text-slate-600">
          Need to change your account details
          <br />
          Account editing will be available in a future update.
          For now, only your profile picture can be modified.
        </p>
      </div>
    </GlassCard>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {

  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-5">
      <div className="flex items-center gap-3">
        <div className="text-primary-400">
          {icon}
        </div>
     <span className="text-slate-600">
          {label}
        </span>
      </div>
      <span className="font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}