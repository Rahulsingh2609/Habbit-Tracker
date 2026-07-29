import React from 'react';
import { CalendarCheck, BarChart3, PlusCircle, Award } from 'lucide-react';

export type NavTab = 'today' | 'weekly' | 'manage' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  todayCompletionRate: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, todayCompletionRate }) => {
  return (
    <nav className="bottom-nav">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => setActiveTab('today')}
          className={`nav-item ${activeTab === 'today' ? 'active' : ''}`}
        >
          <div className="relative">
            <CalendarCheck className="w-6 h-6" />
            {todayCompletionRate === 100 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>
          <span>Today</span>
        </button>

        <button
          onClick={() => setActiveTab('weekly')}
          className={`nav-item ${activeTab === 'weekly' ? 'active' : ''}`}
        >
          <BarChart3 className="w-6 h-6" />
          <span>Weekly Report</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`}
        >
          <PlusCircle className="w-6 h-6" />
          <span>Habits</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <Award className="w-6 h-6" />
          <span>Streaks</span>
        </button>
      </div>
    </nav>
  );
};
