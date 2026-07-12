import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import Button  from '@components/ui/Button/Button.jsx';
import Input   from '@components/ui/Input/Input.jsx';
// import OrbGlow from '@components/shared/OrbGlow/OrbGlow.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';
import { ROUTES } from '@constants/routes.js';
import styles from './Login.module.css';
import { useSearchParams } from 'react-router-dom';

export default function Login() {
  const { login, isLoading, error, dismissError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
   const [searchParams] = useSearchParams();
   const oauthError = searchParams.get('error');

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
  };''
  const BACKEND = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';

  return (
    <div className={`${styles.page} min-h-screen bg-bg-base flex items-center justify-center px-4 relative overflow-hidden`}>
     

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
            <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
            <p className="text-sm text-slate-500">Sign in to your AI workspace</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </motion.div>
          )}
           {oauthError && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700">
                     {oauthError === 'google_failed'
                      ? 'Google sign-in failed. Please try again or use email.'
                       : 'GitHub sign-in failed. Make sure your GitHub email is public, then try again.'}
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

            <Button type="submit" loading={isLoading} fullWidth size="lg" className="mt-2">Sign in</Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-500">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
  
           <a href={`${BACKEND}/api/auth/google`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl borde
              r border-slate-200 text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium"
             >   <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
                   1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
                 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7
               .07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 
               2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
             </svg>
                 Google
                </a> 
                <a href={`${BACKEND}/api/auth/github`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 
                  text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium"
                    >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0
                         -.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-
                         .62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.
                         338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 
                         2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379
                         .202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0
                          1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                     GitHub
                    </a>
                     </div>
                

          <p className="text-center text-sm text-slate-500 mt-6">
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
