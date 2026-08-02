import React, { useState } from 'react';
import { FloatingBackground } from './components/FloatingBackground';

interface AuthGateProps {
  onLoginSuccess: (userData: any) => void;
}

export default function AuthGate({ onLoginSuccess }: AuthGateProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [signUpStep, setSignUpStep] = useState<1 | 2>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
    collegeName: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 1. HANDLE EXISTING USER LOGIN (Skips Step 2, sets empty defaults)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Existing user logging in: Defaults are empty strings so fake values don't appear
      const existingUserData = {
        fullName: formData.fullName || 'User',
        email: formData.email,
        mobile: '',      // Keeps profile empty unless saved in DB
        age: '',         // Keeps profile empty unless saved in DB
        collegeName: '', // Keeps profile empty unless saved in DB
      };

      onLoginSuccess(existingUserData);
    } catch (err) {
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE ACCOUNT - STEP 1 SUBMIT (Goes to Profile Completion)
  const handleSignUpStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password) {
      setSignUpStep(2); // Advances to Mobile, Age & College screen
    }
  };

  // 3. CREATE ACCOUNT - STEP 2 SUBMIT (Finalizes Profile)
  const handleFinalSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUserData = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        age: formData.age,
        collegeName: formData.collegeName,
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
      {/* Renders your floating emojis in the background */}
      <FloatingBackground />

      <div style={styles.card}>
        {/* Top Circle Icon */}
        <div style={styles.iconCircle}>✓</div>

        <p style={styles.welcomeText}>WELCOME BACK</p>
        <h1 style={styles.title}>Habbit Tracker</h1>
        <p style={styles.subtitle}>
          Build better habbits.<br />
          Stay consistent.<br />
          Become unstoppable. 🚀
        </p>

        {/* Tab Switcher (Login / Create Account) */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={isLoginTab ? styles.tabActive : styles.tabInactive}
            onClick={() => {
              setIsLoginTab(true);
              setSignUpStep(1);
            }}
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

        {/* LOGIN FORM (Existing Users -> Skips Step 2) */}
        {isLoginTab && (
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.gradientButton}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT - STEP 1 (Name, Email, Password) */}
        {!isLoginTab && signUpStep === 1 && (
          <form onSubmit={handleSignUpStep1} style={styles.form}>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.gradientButton}>
              Create Account →
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT - STEP 2 (Complete Profile: Mobile, Age, College) */}
        {!isLoginTab && signUpStep === 2 && (
          <form onSubmit={handleFinalSignUp} style={styles.form}>
            <h3 style={styles.stepTitle}>Complete Your Profile</h3>
            <p style={styles.stepSubtitle}>Just a few more details to get you set up!</p>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="age"
              placeholder="Enter your Age"
              value={formData.age}
              onChange={handleChange}
              min="10"
              max="100"
              required
              style={styles.input}
            />
            <input
              type="text"
              name="collegeName"
              placeholder="College / Institute Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSignUpStep(1)}
                style={styles.secondaryButton}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                style={styles.gradientButton}
              >
                {loading ? 'Saving...' : 'Finish Setup 🚀'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Full Dark Neon Theme Styles (Restored)
const styles: { [key: string]: React.CSSProperties } = {
  background: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#0a0d14',
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
    maxWidth: '420px',
    padding: '25px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'rgba(19, 24, 35, 0.65)',
    borderRadius: '16px',
    border: '1px solid #1e293b',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  iconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px solid #00d2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px auto',
    color: '#00d2ff',
    fontWeight: 'bold',
    fontSize: '20px',
    boxShadow: '0 0 12px rgba(0, 210, 255, 0.3)',
  },
  welcomeText: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: '#00d2ff',
    fontWeight: 'bold',
    marginBottom: '4px',
    marginTop: 0,
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5',
    marginBottom: '20px',
    marginTop: 0,
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#0a0d14',
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
    boxShadow: '0 2px 10px rgba(0, 210, 255, 0.25)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    backgroundColor: '#131823',
    border: '1px solid #1e293b',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  gradientButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '5px',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)',
  },
  secondaryButton: {
    width: '35%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #1e293b',
    backgroundColor: '#131823',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '5px',
  },
  stepTitle: {
    fontSize: '18px',
    margin: '0 0 4px 0',
    color: '#ffffff',
  },
  stepSubtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '10px',
    marginTop: 0,
  },
};