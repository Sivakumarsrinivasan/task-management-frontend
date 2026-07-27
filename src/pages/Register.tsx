import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight, Sun, Moon } from 'lucide-react';
import { loginService } from '../services/user';
import { useUserDetail } from '../Hooks/userDetail';
import { useTheme } from '../Hooks/theme';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const setTheme = useTheme((state)=>state.setTheme);
  const theme = useTheme((state)=>state.theme);
  const navigate = useNavigate();
  // Theme State (Persisted in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return theme === 'dark';
  });
    const setUserData = useUserDetail((state)=>state.setDetail)

  // Sync theme with HTML document class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      setTheme('dark')
    } else {
      root.classList.remove('dark');
            setTheme('light')
    }
  }, [isDarkMode]);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', { email, password });
    const data = await loginService({ email, password });
    console.log(data)
    setUserData({id:data.data.user.id, token:data.data.token});
    navigate('/dashboard')

    } else {
      console.log('Registering with:', { username, email, password });
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Triggering Google OAuth...');
  };

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4 md:p-8 font-sans transition-colors duration-300">
      
      {/* Split-Screen Auth Card */}
      <div className="max-w-5xl w-full bg-surface rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-custom transition-colors duration-300 relative">
        
        {/* ================= LEFT SIDE: AUTH FORM ================= */}
        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
          
          {/* Top Header: Logo + Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-custom flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                T
              </div>
              <h1 className="text-2xl font-extrabold text-main tracking-tight">
                Task<span className="text-primary-custom">Flow</span>
              </h1>
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-2.5 rounded-xl border border-custom bg-input-custom text-muted-custom hover:text-main transition shadow-sm active:scale-95 flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-main">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-muted-custom mt-1 text-sm">
              {isLogin 
                ? 'Please enter your credentials to access your tasks.' 
                : 'Start organizing your daily tasks in seconds.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Field (Register Only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-main uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-custom" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-input-custom border border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-main transition"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-main uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-custom" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-custom border border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-main transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-main uppercase tracking-wider">
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-xs font-semibold text-primary-custom hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-custom" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-input-custom border border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-main transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-custom hover:text-main"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-primary-custom bg-primary-hover text-white font-semibold rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-custom"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-3 text-muted-custom font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 border border-custom rounded-xl text-sm font-medium text-main bg-surface hover:bg-input-custom transition flex items-center justify-center gap-3 shadow-sm active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Toggle View */}
          <div className="mt-8 text-center text-sm text-muted-custom">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary-custom font-semibold hover:underline ml-1"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>

        </div>

        {/* ================= RIGHT SIDE: BRAND PANEL ================= */}
        <div className="hidden md:flex p-10 lg:p-12 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white flex-col justify-between relative overflow-hidden">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight mb-3">
              Task Management<br />Made Simple.
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-xs">
              Organize your tasks by status, filter instantly, and keep track of your daily progress.
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Pending, In-Progress & Completed states</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Fast search, pagination & sorting</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Secure JWT & Google OAuth authentication</span>
            </div>
          </div>

          {/* Decorative Glow Circles */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>
    </div>
  );
}