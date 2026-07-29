import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Habit, HabitLog } from './types/habit';
import { 
  loadHabits, saveHabits, loadLogs, 
  toggleHabitCompletion, calculateUserStats, getTodayString, getTodayLog 
} from './utils/storage';
import { BottomNav } from './components/BottomNav';
import type { NavTab } from './components/BottomNav';
import { DailyChecklist } from './components/DailyChecklist';
import { WeeklyAnalytics } from './components/WeeklyAnalytics';
import { HabitManager } from './components/HabitManager';
import { ProfileStreaks } from './components/ProfileStreaks';
import { Flame } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, HabitLog>>({});

  useEffect(() => {
    const loadedHabits = loadHabits();
    const loadedLogs = loadLogs();
    setHabits(loadedHabits);
    setLogs(loadedLogs);
  }, []);

  const handleToggleHabit = (dateStr: string, habitId: string, metricValue?: number) => {
    const { updatedLogs, isCompletedNow } = toggleHabitCompletion(logs, dateStr, habitId, metricValue);
    setLogs(updatedLogs);

    const todayLog = getTodayLog(updatedLogs, getTodayString());
    if (isCompletedNow && todayLog.completedHabitIds.length === habits.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8'],
      });
    }
  };

  const handleAddHabit = (newHabit: Habit) => {
    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabits(updated);
  };

  const handleDeleteHabit = (habitId: string) => {
    const updated = habits.filter((h) => h.id !== habitId);
    setHabits(updated);
    saveHabits(updated);
  };

  const stats = calculateUserStats(logs, habits);
  const todayLog = getTodayLog(logs, getTodayString());
  const todayCompletionRate = habits.length > 0
    ? Math.round((todayLog.completedHabitIds.length / habits.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400 font-extrabold text-base">
                ⚡
              </div>
            </div>
            <div>
              <h1 className="font-black text-lg text-white tracking-tight leading-none gradient-text">
                Habbit Tracker
              </h1>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Daily Routine & Output Analytics
              </span>
            </div>
          </div>

          {/* Quick Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{stats.currentStreak}d Streak</span>
          </div>
        </div>
      </header>

      {/* Main Active Tab Content View */}
      <main className="flex-1">
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
            onAddHabit={handleAddHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        )}

        {activeTab === 'profile' && <ProfileStreaks stats={stats} />}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        todayCompletionRate={todayCompletionRate}
      />
    </div>
  );
}

export default App;
