import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PublicLayout    from '@layouts/PublicLayout.jsx';
import DashboardLayout from '@layouts/DashboardLayout.jsx';
import PublicRoutes    from './PublicRoutes.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import LoadingScreen   from '@components/shared/LoadingScreen/LoadingScreen.jsx';
import { ROUTES } from '@constants/routes.js';

//  Lazy load all route components for better performance and code splitting
const Landing         = lazy(() => import('@pages/Landing/Landing'));
const Login           = lazy(() => import('@pages/Auth/Login/Login'));
const Signup           = lazy(() => import('@pages/Auth/Signup/Signup'));
const Dashboard        = lazy(() => import('@pages/Dashboard/Dashboard'));
const ResumeAnalysis   = lazy(() => import('@pages/Dashboard/sections/ResumeAnalysis'));
const AnalysisHistory  = lazy(() => import('@pages/Dashboard/sections/AnalysisHistory'));

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-gradient mb-4">404</h1>
        <p className="text-gray-400 mb-8">This page doesn't exist.</p>
        <Link to={ROUTES.HOME} className="text-primary-400 hover:underline">Go home</Link>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Landing />} />

          
          <Route element={<PublicRoutes />}>
            <Route path={ROUTES.LOGIN}  element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ANALYSIS}  element={<ResumeAnalysis />} />
            <Route path={ROUTES.HISTORY}   element={<AnalysisHistory />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}