import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TravelerProfile } from '../types';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: TravelerProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>(initialMode);
  const [email, setEmail] = useState('dhanush.traveler@example.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Dhanush Kumar');
  const [city, setCity] = useState('Bengaluru');
  const [otpCode, setOtpCode] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const mockUser: TravelerProfile = {
    id: 'user-dhanush',
    name: name || 'Dhanush Kumar',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    city: city || 'Bengaluru',
    occupation: 'Travel Enthusiast',
    bio: 'Passionate solo backpacker exploring group journeys with The Stranger Society.',
    tribePersonality: 'THE ADVENTURER',
    interests: ['🏕 Adventure', '🌿 Nature', '🏔 Mountains'],
    travelStyle: ['Backpacking', 'Group Vibes'],
    journeysJoinedCount: 2,
    badges: ['Verified Traveler', 'Society Member'],
    isDemo: true,
    instagramHandle: '@dhanush.explores',
    favoriteQuote: 'Where strangers find their tribe.',
    verifiedTraits: ['Govt ID Verified (Demo)', 'Email Verified']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setNotification('Demo password reset link dispatched to ' + email);
      setTimeout(() => setMode('login'), 2000);
      return;
    }

    if (mode === 'signup') {
      setMode('verify');
      setNotification('Demo OTP verification code sent to ' + email + ' (Use 1234)');
      return;
    }

    if (mode === 'verify') {
      onLoginSuccess(mockUser);
      onClose();
      return;
    }

    // Default Login
    onLoginSuccess(mockUser);
    onClose();
  };

  const handleGoogleAuth = () => {
    setNotification('Signing in with Google Demo Account...');
    setTimeout(() => {
      onLoginSuccess(mockUser);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="auth-modal-dialog"
        className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strangers Trip Community</span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-100">
            {mode === 'login' && 'Welcome Back, Traveler'}
            {mode === 'signup' && 'Create Your Traveler Profile'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'verify' && 'Verify Email / Phone'}
          </h3>
          <p className="text-xs text-stone-400">
            {mode === 'login' && 'Log in to manage your group trips & community messages'}
            {mode === 'signup' && 'Join 1,000+ travelers exploring verified group trips'}
            {mode === 'forgot' && 'Enter your registered email address to receive a demo reset link'}
            {mode === 'verify' && 'Enter the 4-digit code sent to your email or phone (1234)'}
          </p>
        </div>

        {notification && (
          <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Social Google Login Button */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-3">
            <button
              type="button"
              id="btn-google-login"
              onClick={handleGoogleAuth}
              className="w-full py-2.5 px-4 bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
              </svg>
              <span>Continue with Google (Demo)</span>
            </button>

            <div className="relative flex items-center justify-center text-xs text-stone-500 uppercase my-2">
              <span className="bg-stone-900 px-2 font-mono text-[10px]">Or continue with email</span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs text-stone-400 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dhanush Kumar"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Current City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru / Mumbai / Delhi..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </>
          )}

          {mode !== 'verify' && (
            <div>
              <label className="text-xs text-stone-400 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && mode !== 'verify' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-stone-400">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {mode === 'verify' && (
            <div>
              <label className="text-xs text-stone-400 block mb-1">Enter Verification OTP (Code: 1234)</label>
              <input
                type="text"
                maxLength={4}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1234"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl text-center py-3 font-mono text-lg tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <button
            type="submit"
            id="btn-auth-submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <span>
              {mode === 'login' && 'Log In to Demo Account'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Demo Reset Email'}
              {mode === 'verify' && 'Verify & Enter App'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="pt-4 border-t border-stone-800 text-center text-xs text-stone-400">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-emerald-400 hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-emerald-400 hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
