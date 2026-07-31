import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { FloatingBackground } from './components/FloatingBackground';
import { DailyChecklist } from './components/DailyChecklist';
import { BottomNav } from './components/BottomNav';
import type { NavTab } from './components/BottomNav';
import { ProfileStreaks } from './components/ProfileStreaks';
import { HabitManager } from './components/HabitManager';
import { WeeklyAnalytics } from './components/WeeklyAnalytics';
import { OnboardingModal } from './components/OnBoardingModal';
import type { Habit, HabitLog } from './types/habit';
import type { UserProfile } from './types/user';
import { loadHabits, saveHabits, loadLogs, toggleHabitCompletion } from './utils/storage';

export function App() {
  const [firebaseUser] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, HabitLog>>({});

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile_data');
    return saved ? JSON.parse(saved) : { name: '', phone: '', college: '', age: '', isProfileComplete: false };
  });

  useEffect(() => {
    setHabits(loadHabits());
    setLogs(loadLogs());
  }, []);

  // Pre-fill the profile name/email from the Firebase account so the
  // Profile tab always reflects who is actually logged in.
  useEffect(() => {
    if (firebaseUser && !userProfile.name && firebaseUser.displayName) {
      const prefilled = { ...userProfile, name: firebaseUser.displayName };
      setUserProfile(prefilled);
      localStorage.setItem('user_profile_data', JSON.stringify(prefilled));
    }
  }, [firebaseUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('user_profile_data', JSON.stringify(profile));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Failed to sign out', err);
    }
    // AuthGate will swap back to the Login page automatically once
    // Firebase's auth state clears; we just reset local UI state here.
    setActiveTab('today');
  };

  const handleToggleHabit = (dateStr: string, habitId: string, metricValue?: number) => {
    const { updatedLogs } = toggleHabitCompletion(logs, dateStr, habitId, metricValue);
    setLogs(updatedLogs);
  };

  const handleHabitChange = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative antialiased selection:bg-cyan-500 selection:text-white">
      {/* Ambient Floating Background */}
      <FloatingBackground />

      {/* Onboarding Modal */}
      {!userProfile.isProfileComplete && (
        <OnboardingModal
          userProfile={userProfile}
          onCompleteProfile={handleSaveProfile}
        />
      )}

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 pt-8">
        {activeTab === 'today' && (
          <DailyChecklist
            habits={habits}
            logs={logs}
            onToggleHabit={handleToggleHabit}
            onOpenWeeklyReport={() => setActiveTab('weekly')}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyAnalytics habits={habits} logs={logs} />
        )}

        {activeTab === 'manage' && (
          <HabitManager
            habits={habits}
            onSaveHabits={handleHabitChange}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileStreaks
            userProfile={userProfile}
            userEmail={firebaseUser?.email ?? undefined}
            onSaveProfile={handleSaveProfile}
            onLogout={handleLogout}
            totalCompletedHabits={Object.values(logs).reduce((acc, log) => acc + (log.completedHabitIds?.length || 0), 0)}
          />
        )}
      </main>

      {/* Glassmorphic Navigation Dock */}
      <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} todayCompletionRate={0} />
      </div>
    </div>
  );
}

export default App;