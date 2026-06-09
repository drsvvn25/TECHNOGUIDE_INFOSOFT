import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Mail, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";

interface AuthViewProps {
  onLoginSuccess: (userData: { name: string; email: string }) => void;
  activeTab: "login" | "signup";
  setActiveTab: (tab: "login" | "signup") => void;
}

export default function AuthView({ onLoginSuccess, activeTab, setActiveTab }: AuthViewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("alex@company.ai");
  const [loginPassword, setLoginPassword] = useState("password123");
  
  const [signupName, setSignupName] = useState("Alex Rivera");
  const [signupEmail, setSignupEmail] = useState("alex@company.ai");
  const [signupPassword, setSignupPassword] = useState("••••••••");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      alert("Please enter your email address.");
      return;
    }
    // Set dynamic custom name based on prefix or default
    const nameFromEmail = loginEmail.includes("@") ? loginEmail.split("@")[0] : "User";
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    onLoginSuccess({
      name: formattedName === "Alex" ? "Alex Rivera" : formattedName,
      email: loginEmail,
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail) {
      alert("Please fill in your full name and email.");
      return;
    }
    onLoginSuccess({
      name: signupName,
      email: signupEmail,
    });
  };

  const handleSocialClick = (provider: string) => {
    onLoginSuccess({
      name: "Alex Rivera",
      email: "alex.rivera@gmail.com",
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Subtle Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[25%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Brand Header */}
        <header className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-brand-primary-container rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-650/35 mb-4 animate-bounce duration-1000">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-brand-primary tracking-tight">BusinessBoost AI</h1>
          <p className="font-sans text-xs text-brand-on-surface-variant max-w-[280px] mt-1.5 leading-relaxed">
            Accelerate your workflow with intelligent automation.
          </p>
        </header>

        {/* Auth Container */}
        <div className="w-full glass-card rounded-2xl p-6 shadow-2xl relative border border-brand-outline/10">
          {/* Tabs */}
          <nav className="flex w-full mb-6 border-b border-brand-outline/10">
            <button
              id="auth-tab-login"
              type="button"
              className={`flex-1 pb-4 font-headline text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "login"
                  ? "text-brand-primary border-b-2 border-brand-primary-container"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              className={`flex-1 pb-4 font-headline text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "signup"
                  ? "text-brand-primary border-b-2 border-brand-primary-container"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </nav>

          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
                onSubmit={handleLoginSubmit}
              >
                <div className="space-y-1.5">
                  <label className="font-headline text-xs font-semibold text-brand-on-surface-variant block px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
                    <input
                      id="login-input-email"
                      className="w-full bg-brand-surface-high border border-brand-outline/15 text-white rounded-xl pl-12 pr-4 py-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans text-sm focus:outline-none"
                      placeholder="alex@company.ai"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-headline text-xs font-semibold text-brand-on-surface-variant block px-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
                    <input
                      id="login-input-password"
                      className="w-full bg-brand-surface-high border border-brand-outline/15 text-white rounded-xl pl-12 pr-12 py-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans text-sm focus:outline-none"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      id="login-btn-toggle-password"
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-outline hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <span
                    id="login-forgot-password"
                    onClick={() => alert("Password reset requested. Check your email inbox shortly!")}
                    className="font-headline text-xs font-semibold text-brand-primary hover:text-indigo-200 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </div>

                <button
                  id="login-submit"
                  type="submit"
                  className="w-full bg-brand-primary-container text-white font-headline text-sm font-bold py-4 rounded-xl shadow-lg hover:shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer"
                >
                  Login
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
                onSubmit={handleSignupSubmit}
              >
                <div className="space-y-1.5">
                  <label className="font-headline text-xs font-semibold text-brand-on-surface-variant block px-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
                    <input
                      id="signup-input-name"
                      className="w-full bg-brand-surface-high border border-brand-outline/15 text-white rounded-xl pl-12 pr-4 py-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans text-sm focus:outline-none"
                      placeholder="Alex Rivera"
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-headline text-xs font-semibold text-brand-on-surface-variant block px-1">Work Email</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
                    <input
                      id="signup-input-email"
                      className="w-full bg-brand-surface-high border border-brand-outline/15 text-white rounded-xl pl-12 pr-4 py-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans text-sm focus:outline-none"
                      placeholder="alex@company.ai"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-headline text-xs font-semibold text-brand-on-surface-variant block px-1">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
                    <input
                      id="signup-input-password"
                      className="w-full bg-brand-surface-high border border-brand-outline/15 text-white rounded-xl pl-12 pr-4 py-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans text-sm focus:outline-none"
                      placeholder="••••••••"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  id="signup-submit"
                  type="submit"
                  className="w-full bg-brand-secondary-container text-white font-headline text-sm font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-600/30 active:scale-98 transition-all cursor-pointer bg-emerald-500"
                >
                  Create Account
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social Auth Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-outline/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">
              <span className="bg-[#171f33] px-3">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              id="auth-social-google"
              type="button"
              onClick={() => handleSocialClick("Google")}
              className="flex items-center justify-center gap-2 bg-brand-surface-highest/40 border border-brand-outline/15 py-3 rounded-xl hover:bg-brand-surface-highest/60 transition-all active:scale-95 cursor-pointer"
            >
              <img
                alt="Google Logo"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQD9sU4IGaWn9AumFAFwpUaVKZO7YASSPLqCY29JXOKxNO9U65nIiMNXDWYEAjMiJkTjPj_uSdYzoP9ZpN52lVzk4X6LxcxwTO7Jb213cY2dE9No7WcPX2BAY0sO9N5zr5DsHV6lnEB4Rgfz9TILtiqh4_CiEtK4Syp_Lhioig4fCGvxkwGPNsKkpiglcqoTNOuLgB4RcyBOb7yR96hf9EhwHDnagXoELrg_3Pm5AJY-UTQZQgd-GyZNu1keiXYVrLhvOu6M-2HM8"
                referrerPolicy="no-referrer"
              />
              <span className="font-headline text-xs text-white">Google</span>
            </button>
            <button
              id="auth-social-apple"
              type="button"
              onClick={() => handleSocialClick("Apple")}
              className="flex items-center justify-center gap-2 bg-brand-surface-highest/40 border border-brand-outline/15 py-3 rounded-xl hover:bg-brand-surface-highest/60 transition-all active:scale-95 cursor-pointer"
            >
              <img
                alt="Apple Logo"
                className="w-5 h-5 brightness-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4fTTHPi-Nixjd7OWFTnj-GajqeY1g742uJiSL33MZHhmuGafOW5MIoFEtkIVkjxg_PlrLmReyb90mCC0o7VGzLuIYopQaVRbaZrYyh5DG1E-l4jPx8XrHhyNUv8iea4Dj0OoQauoVcOrOvIHPJRSI4gNg6Hs-wDifGmBlhdIvioM7zBuRRGYCUz0XeNUWLKjDlD8Iuf42YRC_48ChvK4o5PLa6n1yMJzitYUjJBM8wmGKrkwkgvzpfO84jX6c4n_1tBzI1xDUuqo"
                referrerPolicy="no-referrer"
              />
              <span className="font-headline text-xs text-white">Apple</span>
            </button>
          </div>
        </div>

        {/* Footer Policy text */}
        <footer className="mt-8 text-center max-w-[280px]">
          <p className="font-sans text-[11px] text-brand-on-surface-variant leading-relaxed">
            By continuing, you agree to our <br />
            <span
              onClick={() => alert("Terms of Service placeholder")}
              className="text-brand-primary hover:underline cursor-pointer"
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              onClick={() => alert("Privacy Policy placeholder")}
              className="text-brand-primary hover:underline cursor-pointer"
            >
              Privacy Policy
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
