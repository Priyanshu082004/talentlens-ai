import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, AtSign, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import Button  from '@components/ui/Button/Button.jsx';
import Input   from '@components/ui/Input/Input.jsx';
import OrbGlow from '@components/shared/OrbGlow/OrbGlow.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { ROUTES } from '@constants/routes.js';
import styles from './Signup.module.css';
import clsx from 'clsx';

const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[a-z]/.test(pw))        score++;
  if (/\d/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
const STRENGTH_COLORS = ['', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-400'];

export default function Signup() {
  const { signup, isLoading, error, dismissError } = useAuth();
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [agreed,  setAgreed]  = useState(false);

  // Backend requires: fullName, username, email, password
  const [form, setForm] = useState({
    fullName:        '',
    username:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = 'Full name is required';
    if (!form.username) e.username = 'Username is required';
    if (/\s/.test(form.username)) e.username = 'Username cannot contain spaces';
    if (!form.email)    e.email    = 'Email is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    if (form.password.length < 8) e.password = 'At least 8 characters required';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreed) e.agreed = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dismissError();
    // Send exactly what the backend expects
    await signup({
      fullName: form.fullName,
      username: form.username,
      email:    form.email,
      password: form.password,
    });
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  return (
    <div className={`${styles.page} min-h-screen bg-bg-base flex items-center justify-center px-4 py-12 relative overflow-hidden`}>
      <OrbGlow color="#7C3AED" size={700} opacity={0.12} top="10%" left="60%" />
      <OrbGlow color="#6366F1" size={400} opacity={0.08} top="80%" left="10%" />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full max-w-md relative z-10">
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-2 mb-8">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-900 text-xl">TalentLensAI</span>
          </Link>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-8">
          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
            <p className="text-sm text-slate-500">Start analyzing your resume for free</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* fullName — maps to backend field */}
            <Input
              label="Full name" placeholder="Priyanshu Sharma"
              value={form.fullName} onChange={set('fullName')}
              icon={User} error={errors.fullName} required
            />

            {/* username — required by backend register */}
            <Input
              label="Username" placeholder="priyanshu_dev"
              value={form.username} onChange={set('username')}
              icon={AtSign} error={errors.username} required
            />

            <Input
              label="Email" type="email" placeholder="you@example.com"
              value={form.email} onChange={set('email')}
              icon={Mail} error={errors.email} required
            />

            <div className="flex flex-col gap-1.5">
              <Input
                label="Password" type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters"
                value={form.password} onChange={set('password')} icon={Lock}
                rightIcon={showPw ? EyeOff : Eye} onRightIconClick={() => setShowPw((p) => !p)}
                error={errors.password} required
              />

              {form.password && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={clsx('h-1 flex-1 rounded-full transition-colors duration-300', i <= strength ? STRENGTH_COLORS[strength] : 'bg-slate-100')} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Strength: <span className="text-slate-600">{STRENGTH_LABELS[strength]}</span>
                  </p>
                </motion.div>
              )}
            </div>

            <Input
              label="Confirm password" type={showCpw ? 'text' : 'password'} placeholder="Repeat your password"
              value={form.confirmPassword} onChange={set('confirmPassword')} icon={Lock}
              rightIcon={showCpw ? EyeOff : Eye} onRightIconClick={() => setShowCpw((p) => !p)}
              error={errors.confirmPassword} required
            />

            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox" checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors((p) => ({ ...p, agreed: '' })); }}
                  className="mt-0.5 w-4 h-4 rounded accent-primary-500 shrink-0"
                />
                <span className="text-xs text-slate-500">
                  I agree to the <a href="#" className="text-primary-400 hover:underline">Terms of Service</a>{' '}
                  and <a href="#" className="text-primary-400 hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-red-400">⚠ {errors.agreed}</p>}
            </div>

            <Button type="submit" loading={isLoading} fullWidth size="lg" className="mt-2">
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}</p>
            <Link to={ROUTES.LOGIN} className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
              Sign in
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
