import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Mail, 
  Shield, 
  LogIn, 
  CheckCircle, 
  User, 
  Building, 
  AlertTriangle, 
  UserPlus, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // Sign In inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up inputs
  const [signupName, setSignupName] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  // Read registered users list helper from localStorage
  const getRegisteredUsers = () => {
    const defaultUsers = [
      {
        email: 'alex.rivera@vendorbridge.com',
        password: 'security_pass_2026',
        name: 'Alex Rivera',
        company: 'VendorBridge ERP'
      }
    ];
    const saved = localStorage.getItem('erp_users_list');
    if (!saved) {
      localStorage.setItem('erp_users_list', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultUsers;
    }
  };

  // Add a user helper
  const saveUserToDB = (newUser: any) => {
    const users = getRegisteredUsers();
    users.push(newUser);
    localStorage.setItem('erp_users_list', JSON.stringify(users));
  };

  // Prefill Alex Rivera credentials
  const handlePrefill = () => {
    setEmail('alex.rivera@vendorbridge.com');
    setPassword('security_pass_2026');
    setErrorMsg('');
  };

  // Form Submit for Sign In
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsVerifying(true);

    const users = getRegisteredUsers();
    const matchedUser = users.find((u: any) => u.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!matchedUser) {
      setTimeout(() => {
        setIsVerifying(false);
        setErrorMsg('Access Denied: Work email not recognized in directory.');
      }, 1000);
      return;
    }

    if (matchedUser.password !== password) {
      setTimeout(() => {
        setIsVerifying(false);
        setErrorMsg('Access Denied: Encrypted credential handshake failed.');
      }, 1000);
      return;
    }

    // Success Authentication sequence
    setTimeout(() => {
      setIsVerifying(false);
      setIsGranted(true);
      
      // Store dynamic current user session
      localStorage.setItem('erp_current_user', JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        company: matchedUser.company || 'Procurement Coordinator'
      }));

      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 1200);
  };

  // Form Submit for Sign Up (Create Account)
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Input Validations
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword || !signupConfirmPassword) {
      setErrorMsg('All identification fields are required.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match. Re-enter credentials.');
      return;
    }

    if (signupPassword.length < 5) {
      setErrorMsg('Password must be at least 5 characters for compliance.');
      return;
    }

    const users = getRegisteredUsers();
    const emailExists = users.some((u: any) => u.email.toLowerCase().trim() === signupEmail.toLowerCase().trim());

    if (emailExists) {
      setErrorMsg('This work email is already registered in our ERP directory.');
      return;
    }

    // Provision account & auto-authenticate
    setIsVerifying(true);
    const newUserObj = {
      name: signupName.trim(),
      email: signupEmail.toLowerCase().trim(),
      password: signupPassword,
      company: signupCompany.trim() || 'Global Sourcing Corp'
    };

    setTimeout(() => {
      saveUserToDB(newUserObj);
      setIsVerifying(false);
      setSuccessMsg('Account securely provisioned and registered!');
      
      // Store current session immediately for direct login transition
      localStorage.setItem('erp_current_user', JSON.stringify({
        name: newUserObj.name,
        email: newUserObj.email,
        company: newUserObj.company
      }));

      setIsGranted(true);
      
      setTimeout(() => {
        onLoginSuccess();
      }, 850);
    }, 1400);
  };

  // Clean form state when changing modes
  const handleToggleMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    setIsVerifying(false);
    setIsGranted(false);
  };

  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-auto py-12 px-4 select-none">
      
      {/* Background Dotted Overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      
      {/* Soft Glow Radial Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="z-10 w-full max-w-[420px]">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 bg-surface-container-highest border border-outline-variant flex items-center justify-center rounded-lg mb-3">
            <Shield className="text-primary w-6 h-6 animate-pulse" />
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            VendorBridge
          </h1>
          <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
            Secure Procurement ERP System
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-300 text-xs flex items-start gap-2.5 font-sans"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs flex items-start gap-2.5 font-sans"
              >
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {mode === 'signin' ? (
              <motion.div
                key="signin-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  {/* Field 1: Email */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="email block">
                        Work Email
                      </label>
                      <button 
                        type="button" 
                        onClick={handlePrefill}
                        className="font-mono text-[9px] text-primary hover:underline cursor-pointer"
                      >
                        Use Demo Account
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.rivera@vendorbridge.com"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="font-mono text-[10px] text-on-surface-variant uppercase" htmlFor="password block">
                        Credential Key
                      </label>
                      <span className="font-mono text-[9px] text-[#71717A] hover:text-white transition-colors cursor-pointer">
                        Forgot Key?
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button 
                    type="submit" 
                    disabled={isVerifying || isGranted}
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:scale-100 disabled:opacity-90 text-white font-sans text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isVerifying ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-mono text-xs">Authenticating Profile...</span>
                      </>
                    ) : isGranted ? (
                      <>
                        <CheckCircle className="text-emerald-400 w-5 h-5" />
                        <span className="font-mono text-xs text-emerald-400 font-bold">ERP Pipeline Active</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Station</span>
                        <LogIn className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* SSO separator */}
                  <div className="relative py-2 flex items-center select-none">
                    <div className="flex-grow border-t border-outline-variant/40"></div>
                    <span className="flex-shrink mx-4 font-mono text-[9px] text-on-surface-variant/40">DIRECT HANDSHAKE</span>
                    <div className="flex-grow border-t border-outline-variant/40"></div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      handlePrefill();
                      setIsVerifying(true);
                      setTimeout(() => {
                        setIsVerifying(false);
                        setIsGranted(true);
                        // Store Alexis session
                        localStorage.setItem('erp_current_user', JSON.stringify({
                          name: 'Alex Rivera',
                          email: 'alex.rivera@vendorbridge.com',
                          company: 'VendorBridge ERP'
                        }));
                        setTimeout(() => onLoginSuccess(), 600);
                      }, 1000);
                    }}
                    className="w-full h-11 bg-transparent hover:bg-surface-variant/30 border border-outline-variant text-on-surface font-sans text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <img 
                      alt="Google authentication identity logo" 
                      className="w-4 h-4" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoOVpXBbgpaKlXy1w-PRiX8E95z9TVBBYQTV4tbgOUCYqXdmE1He3tGEHl13OHVMRK9VXs_aFBwad1fMz-4tfERIz_XE4iwZ3CSldAL5oAa1QbnuctAp2mKPKaYhfwvKzxFjbxHOZOfZ_p4hBX1kWD7S7T2raU5-JBEyUV2U3jimabcbWUh65Cpagf84IbUQoMX4wZILoWgTLN-oKPn7wNzxO59rXTGXuAsk2U2nV2La9keAceb1HquBKp8uqIhQG6eAPHiYcqVley"
                    />
                    <span className="font-mono text-xs text-on-surface">Authenticate with Google</span>
                  </button>

                  {/* Link to Register */}
                  <div className="pt-4 border-t border-outline-variant/30 text-center">
                    <p className="text-xs text-on-surface-variant">
                      No ERP credential set?{' '}
                      <button 
                        type="button" 
                        onClick={() => handleToggleMode('signup')}
                        className="text-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                      >
                        Create Account <ArrowRight className="w-3 h-3" />
                      </button>
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  
                  {/* Field 1: Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="reg-name">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <User className="w-4 h-4" />
                      </span>
                      <input 
                        id="reg-name"
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. David Sterling"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="reg-email">
                      Work Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        id="reg-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="david.s@company.com"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 3: Company Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="reg-company">
                      Organization / Company
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Building className="w-4 h-4" />
                      </span>
                      <input 
                        id="reg-company"
                        type="text"
                        value={signupCompany}
                        onChange={(e) => setSignupCompany(e.target.value)}
                        placeholder="e.g. Apex Sourcing Co."
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 4: Password */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="reg-pass">
                      Security Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        id="reg-pass"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 5: Confirm Password */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase px-1" htmlFor="reg-confirm">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        id="reg-confirm"
                        type="password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={isVerifying || isGranted}
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-sm rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Registration Button */}
                  <button 
                    type="submit" 
                    disabled={isVerifying || isGranted}
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:scale-100 disabled:opacity-90 text-white font-sans text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    {isVerifying ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-mono text-xs">Provisioning Identity...</span>
                      </>
                    ) : isGranted ? (
                      <>
                        <CheckCircle className="text-emerald-400 w-5 h-5 animate-bounce" />
                        <span className="font-mono text-xs text-emerald-400 font-bold">Secure Access Active!</span>
                      </>
                    ) : (
                      <>
                        <span>Provision Host Account</span>
                        <UserPlus className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Link back to Sign In */}
                  <div className="pt-4 border-t border-outline-variant/30 text-center">
                    <p className="text-xs text-on-surface-variant">
                      Already have access keys?{' '}
                      <button 
                        type="button" 
                        onClick={() => handleToggleMode('signin')}
                        className="text-primary hover:underline font-semibold cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Verification Info Panel */}
        <div className="mt-5 p-4 bg-surface-container-high/30 border border-outline-variant/30 rounded-lg flex items-start gap-3">
          <Shield className="text-tertiary w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Authorized node {mode === 'signin' ? 'access point' : 'registration checkpoint'}. All activity is securely audited via encrypted ERP ledger protocols.
          </p>
        </div>
      </div>

      {/* Footer Layout elements */}
      <footer className="mt-12 flex flex-col items-center gap-1.5 z-10">
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono text-[10px] text-on-surface-variant hover:text-white cursor-pointer select-none">Privacy Policy</span>
          <span className="w-1.5 h-1.5 bg-outline-variant rounded-full"></span>
          <span className="font-mono text-[10px] text-on-surface-variant hover:text-white cursor-pointer select-none">Terms of Service</span>
        </div>
        <div className="flex items-center gap-1 opacity-55 saturate-50 mt-1">
          <span className="font-mono text-[9px] text-on-surface-variant">Powered by</span>
          <span className="font-mono text-[10px] text-white tracking-widest font-extrabold">VENDORBRIDGE</span>
        </div>
      </footer>
    </main>
  );
}
