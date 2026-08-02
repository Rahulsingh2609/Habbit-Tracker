import { useState } from 'react';
import AuthGate from './AuthGate';

// Import your existing app components here as needed
// import BottomNav from './components/BottomNav';
// import DailyChecklist from './components/DailyChecklist';

export interface UserProfile {
  fullName: string;
  email: string;
  mobile: string;
  age: string;
  collegeName: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleLoginSuccess = (userData: UserProfile) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 1. Show AuthGate if user is not authenticated
  if (!currentUser) {
    return <AuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Render Main App once authenticated
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
        <p><strong>Mobile:</strong> {currentUser.mobile || 'Not provided'}</p>
        <p><strong>Age:</strong> {currentUser.age || 'Not provided'}</p>
        <p><strong>College/Institute:</strong> {currentUser.collegeName || 'Not provided'}</p>
      </div>

      {/* Render your existing Habit Tracker components here */}
      {/* <DailyChecklist /> */}
      {/* <BottomNav /> */}
    </div>
  );
}