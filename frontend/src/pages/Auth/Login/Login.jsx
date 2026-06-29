import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import Button  from '@components/ui/Button/Button.jsx';
import Input   from '@components/ui/Input/Input.jsx';
import OrbGlow from '@components/shared/OrbGlow/OrbGlow.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { ROUTES } from '@constants/routes.js';
import styles from './Login.module.css';

export default function Login() {
  const { login, isLoading, error, dismissError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email)    e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dismissError();
    await login(form);
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  return (
    <div className={`${styles.page} min-h-screen bg-bg-base flex items-center justify-center px-4 relative overflow-hidden`}>
      <OrbGlow color="#6366F1" size={700} opacity={0.12} top="10%" left="50%" />
      <OrbGlow color="#7C3AED" size={500} opacity={0.08} top="70%" left="20%" />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full max-w-md relative z-10">
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-2 mb-8">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">TalentLensAI</span>
          </Link>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-8">
          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your AI workspace</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} icon={Mail} error={errors.email} required />
            <Input
              label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
              value={form.password} onChange={set('password')} icon={Lock}
              rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword((p) => !p)}
              error={errors.password} required
            />

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary-500" />
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
            </div>

            <Button type="submit" loading={isLoading} fullWidth size="lg" className="mt-2">Sign in</Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'GitHub'].map((p) => (
              <button key={p} type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all">
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            No account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
