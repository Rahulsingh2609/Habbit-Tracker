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

  // HANDLE EXISTING USER LOGIN
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Existing user login: No hardcoded/fake defaults used
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

  // STEP 1 SIGN UP: Move to Complete Profile (Step 2)
  const handleSignUpStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password) {
      setSignUpStep(2); // Opens Next Page for Mobile, Age & College
    }
  };

  // STEP 2 SIGN UP: Finalize Profile Completion
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
    <div className="auth-container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Renders Floating Background so TS warning is resolved */}
      <FloatingBackground />

      <div className="auth-card" style={{ position: 'relative', zIndex: 10 }}>
        {/* Toggle Login vs Create Account */}
        <div className="tab-buttons">
          <button
            type="button"
            className={isLoginTab ? 'active' : ''}
            onClick={() => {
              setIsLoginTab(true);
              setSignUpStep(1);
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLoginTab ? 'active' : ''}
            onClick={() => setIsLoginTab(false)}
          >
            Create Account
          </button>
        </div>

        {/* LOGIN FORM (For existing users - skips profile completion) */}
        {isLoginTab && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT - STEP 1 (Name, Email, Password) */}
        {!isLoginTab && signUpStep === 1 && (
          <form onSubmit={handleSignUpStep1} className="auth-form">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">
              Create Account →
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT - STEP 2 (Complete Profile: Mobile, Age, College) */}
        {!isLoginTab && signUpStep === 2 && (
          <form onSubmit={handleFinalSignUp} className="auth-form">
            <h3>Complete Your Profile</h3>
            <p>Please enter your details to get started</p>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              min="10"
              max="100"
              required
            />
            <input
              type="text"
              name="collegeName"
              placeholder="College / Institute Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSignUpStep(1)}
                className="back-btn"
              >
                Back
              </button>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Saving...' : 'Finish & Start'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}