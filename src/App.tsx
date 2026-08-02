import { useState } from 'react';
import AuthGate from './AuthGate';

// Optional: Import your habit components from ./components
// import DailyChecklist from './components/DailyChecklist';
// import BottomNav from './components/BottomNav';

interface UserProfile {
  fullName: string;
  email: string;
  mobile: string;
  age: string;
  collegeName: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Called when login or sign-up finishes
  const handleLoginSuccess = (userData: UserProfile) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 1. IF NOT LOGGED IN -> SHOW AUTHGATE
  if (!currentUser) {
    return <AuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. IF LOGGED IN -> SHOW HABIT TRACKER DASHBOARD
  return (
    <div className="main-app-container">
      <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {currentUser.fullName}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* User Profile Info Card (Clean - No default hardcoded fake numbers) */}
      <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', margin: '20px' }}>
        <h3>Profile Information</h3>
        <p><strong>Mobile:</strong> {currentUser.mobile || 'Not specified'}</p>
        <p><strong>Age:</strong> {currentUser.age || 'Not specified'}</p>
        <p><strong>College/Institute:</strong> {currentUser.collegeName || 'Not specified'}</p>
      </div>

      {/* Render your habit tracker dashboard components here */}
      {/* <DailyChecklist /> */}
      {/* <BottomNav /> */}
    </div>
  );
}