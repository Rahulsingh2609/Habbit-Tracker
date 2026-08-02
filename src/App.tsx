import { useState } from 'react';
import AuthGate from './AuthGate';

export interface UserProfile {
  fullName: string;
  email: string;
  mobile: string;
  age: string;
  collegeName: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ mobile: '', age: '', collegeName: '' });

  const handleLoginSuccess = (userData: UserProfile) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsEditingProfile(false);
  };

  const startEditingProfile = () => {
    if (!currentUser) return;
    setProfileForm({
      mobile: currentUser.mobile,
      age: currentUser.age,
      collegeName: currentUser.collegeName,
    });
    setIsEditingProfile(true);
  };

  const handleProfileFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      mobile: profileForm.mobile,
      age: profileForm.age,
      collegeName: profileForm.collegeName,
    });
    setIsEditingProfile(false);
  };

  if (!currentUser) {
    return <AuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  const isProfileIncomplete = !currentUser.mobile || !currentUser.age || !currentUser.collegeName;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070a12', color: '#ffffff', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Welcome, {currentUser.fullName}!</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            backgroundColor: '#0d1322',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      {/* Profile Info Section */}
      <div style={{ backgroundColor: '#0d1322', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <h3 style={{ marginTop: 0 }}>Profile Details</h3>

        {!isEditingProfile && (
          <>
            <p><strong>Mobile:</strong> {currentUser.mobile || 'Not provided'}</p>
            <p><strong>Age:</strong> {currentUser.age || 'Not provided'}</p>
            <p><strong>College/Institute:</strong> {currentUser.collegeName || 'Not provided'}</p>

            <button
  onClick={startEditingProfile}
  style={{
    marginTop: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    background: isProfileIncomplete
      ? 'linear-gradient(90deg, #6366f1 0%, #00d2ff 100%)'
      : 'transparent',
    border: isProfileIncomplete ? 'none' : '1px solid #1e293b',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  }}
>
  {isProfileIncomplete ? 'Complete your profile' : 'Edit profile'}
</button>
          </>
        )}

        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={profileForm.mobile}
              onChange={handleProfileFieldChange}
              style={inputStyle}
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={profileForm.age}
              onChange={handleProfileFieldChange}
              min="10"
              max="100"
              style={inputStyle}
            />
            <input
              name="collegeName"
              placeholder="College / Institute Name"
              value={profileForm.collegeName}
              onChange={handleProfileFieldChange}
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  backgroundColor: '#0d1322',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #6366f1 0%, #00d2ff 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Render your existing Habit Tracker components here */}
      {/* <DailyChecklist /> */}
      {/* <BottomNav /> */}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  backgroundColor: '#070a12',
  border: '1px solid #1e293b',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};