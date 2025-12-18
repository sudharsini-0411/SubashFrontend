import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2, LogIn } from 'lucide-react';
import { api } from '../api';

const AuthModal = ({ isOpen, onClose, onLogin, theme }) => {
  const [mode, setMode] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (mode === 'SIGNUP' && (!name || !phone))) {
      setError('Please fill in all fields');
      return;
    }

    // Validate password strength for signup: at least 6 chars, one uppercase, one number
    if (mode === 'SIGNUP') {
      const pwdRegex = /(?=.*[A-Z])(?=.*\d)/;
      if (password.length < 6 || !pwdRegex.test(password)) {
        setError('Password must be at least 6 characters and include one uppercase letter and one number');
        return;
      }
    }

    setIsLoading(true);

    try {
      let createdUser = null;
      let existingUser = null;

      // try to find an existing user by email for login flows
      try {
        const allUsers = await api.getAllUsers();
        existingUser = allUsers.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      } catch (fetchErr) {
        // non-fatal: will fall back to signup branch or error message
        console.warn('Could not fetch users for login lookup', fetchErr);
      }

      if (mode === 'SIGNUP') {
        createdUser = await api.createUser({
          name,
          email,
          password,
          phone,
          isAdmin: email === 'admin@admin.com'
        });

        // Auto-login after signup
        const loginData = await api.loginUser({ email, password });
        if (loginData?.token) {
          localStorage.setItem('token', loginData.token);
        }

        setIsLoading(false);
        onLogin({
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          phone: createdUser.phone,
          _id: createdUser._id
        });
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setMode('LOGIN');

      } else {
        // Login Flow
        const data = await api.loginUser({ email, password });

        // Store Token
        localStorage.setItem('token', data.token);

        setIsLoading(false);
        onLogin(data.user);

        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Auth error:', error);
      const serverMessage = error?.response?.data?.error || error?.message;
      setError(serverMessage || 'Authentication failed. Please try again.');
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="relative p-8 pb-16 bg-gradient-to-br from-pink-400 to-pink-500 text-white text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
            <div className="mb-4 inline-flex p-3 rounded-full bg-white/20 backdrop-blur-md shadow-inner">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/80">
              {mode === 'LOGIN'
                ? 'Login to manage your recharges'
                : 'Join us for exclusive offers and rewards'}
            </p>
            {mode === 'LOGIN' && (
              <p className="text-white/60 text-xs mt-2">
                Use admin@admin.com for admin access
              </p>
            )}

            <svg className="absolute bottom-0 left-0 w-full h-12 text-white fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>

          <div className="p-8 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-lg bg-red-50 text-red-500 text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}

              {mode === 'SIGNUP' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                    />
                  </div>
                  <div className="relative group mt-3">
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-gray-200 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all bg-gradient-to-r from-pink-400 to-pink-500"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>{mode === 'LOGIN' ? 'Login' : 'Sign Up'}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                {mode === 'LOGIN' ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={toggleMode}
                className="font-semibold mt-1 hover:underline text-pink-500"
              >
                {mode === 'LOGIN' ? 'Create New Account' : 'Login Here'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
