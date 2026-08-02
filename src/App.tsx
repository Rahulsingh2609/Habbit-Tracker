import React, { useState } from 'react';

export default function AuthGate() {
  // Step 1: Initial Account Data (Name, Email, Password)
  // Step 2: Profile Details (Mobile, College, Age)
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    collegeName: '',
    age: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Move from Step 1 -> Step 2
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password) {
      setStep(2);
    }
  };

  // Final Submit on Step 2
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with your Firebase / Backend Auth logic
      console.log('User Account Created:', formData);
      alert('Profile completed successfully!');
    } catch (error) {
      console.error('Error completing profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        .floating-emoji {
          position: absolute;
          font-size: 28px;
          user-select: none;
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
          opacity: 0.8;
        }
        .input-field {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-field:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
      `}</style>

      {/* Ambient Background Glows */}
      <div style={styles.glowTopLeft} />
      <div style={styles.glowBottomRight} />

      {/* Floating Emojis matching your UI */}
      <span className="floating-emoji" style={{ top: '15%', left: '12%', animationDelay: '0s' }}>🏋️‍♂️</span>
      <span className="floating-emoji" style={{ top: '22%', right: '14%', animationDelay: '1.5s' }}>🍏</span>
      <span className="floating-emoji" style={{ bottom: '25%', left: '10%', animationDelay: '3s' }}>📚</span>
      <span className="floating-emoji" style={{ bottom: '18%', right: '12%', animationDelay: '2s' }}>💻</span>

      {/* Main Form Container */}
      <div style={styles.card}>
        {/* Top Checkmark Circle */}
        <div style={styles.iconCircle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <p style={styles.badge}>WELCOME BACK</p>
        <h1 style={styles.title}>Habbit Tracker</h1>
        <p style={styles.subtitle}>
          Build better habbits.<br />
          Stay consistent.<br />
          Become unstoppable. 🚀
        </p>

        {/* Tab Switcher (Login / Create Account) */}
        <div style={styles.tabContainer}>
          <button style={styles.tabInactive}>Login</button>
          <button style={styles.tabActive}>Create Account</button>
        </div>

        {/* STEP 1: CREATE ACCOUNT (FULL NAME, EMAIL, PASSWORD) */}
        {step === 1 && (
          <form onSubmit={handleNextStep} style={styles.form}>
            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.gradientButton}>
              Create Account →
            </button>
          </form>
        )}

        {/* STEP 2: COMPLETE PROFILE (MOBILE, COLLEGE, AGE) */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} style={styles.form}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>Complete Your Profile</h3>
              <p style={styles.stepSubtitle}>Step 2 of 2 — Almost there!</p>
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>📱</span>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>🎓</span>
              <input
                type="text"
                name="collegeName"
                placeholder="College / Institute Name"
                value={formData.collegeName}
                onChange={handleChange}
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>🎂</span>
              <input
                type="number"
                name="age"
                placeholder="Enter your Age"
                value={formData.age}
                onChange={handleChange}
                min="10"
                max="100"
                className="input-field"
                required
                style={styles.input}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={styles.secondaryButton}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                style={styles.gradientButton}
              >
                {isLoading ? 'Saving...' : 'Finish Setup 🚀'}
              </button>
            </div>
          </form>
        )}

        <p style={styles.footerText}>
          Already have an account? <span style={styles.loginLink}>Log in</span>
        </p>

        <p style={styles.copyright}>@2026 Build by Rahul Singh</p>
      </div>
    </div>
  );
}

// Inline Style Object matching the dark neon theme
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#090d16',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  glowTopLeft: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    zIndex: 1,
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'rgba(58, 190, 248, 0.08)',
    border: '1.5px solid #38bdf8',
    boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
  },
  badge: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#38bdf8',
    fontWeight: '700',
    marginBottom: '6px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5',
    marginBottom: '24px',
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
    background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(56, 189, 248, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  stepHeader: {
    marginBottom: '6px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px 0',
  },
  stepSubtitle: {
    fontSize: '12px',
    color: '#38bdf8',
    margin: 0,
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '16px',
    pointerEvents: 'none',
    opacity: 0.6,
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 46px',
    borderRadius: '12px',
    backgroundColor: '#111726',
    border: '1px solid #1e293b',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  gradientButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(90deg, #818cf8 0%, #38bdf8 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
  },
  secondaryButton: {
    width: '35%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    backgroundColor: '#111726',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '6px',
  },
  footerText: {
    fontSize: '13px',
    color: '#94a3b8',
    marginTop: '20px',
  },
  loginLink: {
    color: '#38bdf8',
    fontWeight: '600',
    cursor: 'pointer',
  },
  copyright: {
    fontSize: '11px',
    color: '#475569',
    marginTop: '25px',
  },
};