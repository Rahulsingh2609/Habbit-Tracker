import React, { useState } from 'react';
import { FloatingBackground } from './components/FloatingBackground';

interface AuthGateProps {
  onLoginSuccess: (userData: any) => void;
}

export default function AuthGate({ onLoginSuccess }: AuthGateProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 1. LOGIN SUBMIT
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingUserData = {
        fullName: formData.fullName || 'User',
        email: formData.email,
        mobile: '',
        age: '',
        collegeName: '',
      };

      onLoginSuccess(existingUserData);
    } catch (err) {
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. SIGN UP SUBMIT (single step — profile filled later from the app)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.fullName && formData.email && formData.password)) return;
    setLoading(true);

    try {
      const newUserData = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: '',       // filled later via "Complete your profile"
        age: '',          // filled later via "Complete your profile"
        collegeName: '',  // filled later via "Complete your profile"
      };

      onLoginSuccess(newUserData);
    } catch (err) {
      console.error('Sign Up Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <FloatingBackground />

      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <p style={styles.welcomeText}>WELCOME BACK</p>
        <h1 style={styles.title}>Habbit Tracker</h1>
        <p style={styles.subtitle}>
          Build better habbits.<br />
          Stay consistent.<br />
          Become unstoppable. 🚀
        </p>

        {/* Tab Switcher */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={isLoginTab ? styles.tabActive : styles.tabInactive}
            onClick={() => setIsLoginTab(true)}
          >
            Login
          </button>
          <button
            type="button"
            style={!isLoginTab ? styles.tabActive : styles.tabInactive}
            onClick={() => setIsLoginTab(false)}
          >
            Create Account
          </button>
        </div>

        {/* LOGIN FORM */}
        {isLoginTab && (
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                👁️
              </button>
            </div>

            <div style={styles.rowBetween}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '6px', accentColor: '#00d2ff' }}
                />
                Remember Me
              </label>
              <a href="#forgot" style={styles.forgotLink}>Forgot Password?</a>
            </div>

            <button type="submit" disabled={loading} style={styles.gradientButton}>
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            <p style={styles.switchText}>
              Don't have an account?{' '}
              <span
                style={styles.actionLink}
                onClick={() => setIsLoginTab(false)}
              >
                Create one
              </span>
            </p>
          </form>
        )}

        {/* CREATE ACCOUNT FORM (single step) */}
        {!isLoginTab && (
          <form onSubmit={handleSignUp} style={styles.form}>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                👁️
              </button>
            </div>

            <button type="submit" disabled={loading} style={styles.gradientButton}>
              {loading ? 'Creating...' : 'Create Account →'}
            </button>

            <p style={styles.switchText}>
              Already have an account?{' '}
              <span style={styles.actionLink} onClick={() => setIsLoginTab(true)}>
                Log in
              </span>
            </p>
          </form>
        )}

        <p style={styles.copyright}>@2026 Build by Rahul Singh</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  background: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#070a12',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
  },
  iconCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#0a101d',
    border: '2px solid #00d2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 0 20px rgba(0, 210, 255, 0.4)',
  },
  welcomeText: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#00d2ff',
    fontWeight: '700',
    marginBottom: '6px',
    marginTop: 0,
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 0 12px 0',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.5',
    marginBottom: '24px',
    marginTop: 0,
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#121826',
    padding: '4px',
    borderRadius: '30px',
    marginBottom: '20px',
    border: '1px solid #1e293b',
  },
  tabInactive: {
    flex: 1,
    padding: '10px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tabActive: {
    flex: 1,
    padding: '10px',
    borderRadius: '25px',
    border: 'none',
    background: 'linear-gradient(90deg, #6366f1 0%, #00d2ff 100%)',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 12px rgba(0, 210, 255, 0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '15px',
    pointerEvents: 'none',
    opacity: 0.7,
  },
  input: {
    width: '100%',
    padding: '14px 44px 14px 44px',
    borderRadius: '12px',
    backgroundColor: '#0d1322',
    border: '1px solid #1e293b',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    opacity: 0.6,
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    marginTop: '-2px',
    marginBottom: '4px',
  },
  checkboxLabel: {
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  forgotLink: {
    color: '#00d2ff',
    textDecoration: 'none',
    fontWeight: '600',
  },
  gradientButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(90deg, #6366f1 0%, #00d2ff 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 18px rgba(0, 210, 255, 0.3)',
  },
  secondaryButton: {
    width: '35%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    backgroundColor: '#0d1322',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  switchText: {
    fontSize: '13px',
    color: '#94a3b8',
    marginTop: '12px',
    marginBottom: 0,
  },
  actionLink: {
    color: '#00d2ff',
    fontWeight: '600',
    cursor: 'pointer',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#ffffff',
  },
  stepSubtitle: {
    fontSize: '12px',
    color: '#00d2ff',
    margin: 0,
  },
  copyright: {
    fontSize: '11px',
    color: '#475569',
    marginTop: '35px',
  },
};