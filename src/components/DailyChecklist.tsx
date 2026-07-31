import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Sparkles, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Habit, HabitLog } from '../types/habit';
import { getTodayString } from '../utils/storage';
import { HabitIcon, getCategoryTheme } from '../utils/icons';

interface Props {
  habits: Habit[];
  logs: Record<string, HabitLog>;
  onToggleHabit: (dateStr: string, habitId: string, metricValue?: number) => void;
  onOpenWeeklyReport: () => void;
}

export function DailyChecklist({ habits, logs, onToggleHabit, onOpenWeeklyReport }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const todayStr = getTodayString();
  const todayLog = logs[todayStr] || { completedHabitIds: [], habitMetrics: {} };

  const completedCount = todayLog.completedHabitIds.length;
  const totalCount = habits.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleTaskClick = (habitId: string, isAlreadyCompleted: boolean) => {
    if (!isAlreadyCompleted) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#10b981'],
      });
    }
    onToggleHabit(todayStr, habitId);
  };

  const categories = [
    { id: 'all', label: 'All Habits', icon: '✨' },
    { id: 'fitness', label: 'Fitness', icon: '🏋️' },
    { id: 'health', label: 'Health', icon: '🥗' },
    { id: 'learning', label: 'Learning', icon: '💻' },
    { id: 'routine', label: 'Routine', icon: '⏰' },
  ];

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter((h) => h.category?.toLowerCase() === selectedCategory);

  return (
    <div className="space-y-6 pb-28">
      {/* Date Header */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-3 px-5 backdrop-blur-md shadow-lg animate-fade-in-up">
        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
            <Calendar className="w-3 h-3" />
            Today
          </div>
          <div className="text-base font-extrabold text-white tracking-wide">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>

        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Score Box */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950 border border-white/10 p-6 backdrop-blur-xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Daily Progress
            </div>

            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {completedCount} <span className="text-lg text-slate-400 font-normal">of {totalCount}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-300 mt-0.5">Habits Completed</p>
            </div>

            <button
              onClick={onOpenWeeklyReport}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1 group transition-colors"
            >
              View Analytics Report
              <TrendingUp className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Radial Bar */}
          <div className="relative flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8" className="text-slate-800/80" fill="transparent" />
              <circle
                cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                className="text-cyan-400 transition-all duration-700 ease-out"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black text-white">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 scale-105"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 border border-white/5"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        {filteredHabits.map((habit, index) => {
          const isCompleted = todayLog.completedHabitIds.includes(habit.id);
          const theme = getCategoryTheme(habit.category);

          return (
            <div
              key={habit.id}
              onClick={() => handleTaskClick(habit.id, isCompleted)}
              className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-[0.98] animate-fade-in-up ${
                isCompleted
                  ? "bg-emerald-950/25 border-emerald-500/30 shadow-lg shadow-emerald-950/30"
                  : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-cyan-400/40 shadow-md backdrop-blur-md"
              }`}
              style={{ animationDelay: `${140 + index * 45}ms` }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Icon Badge — resolved to a real icon that matches the task */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: `0 4px 18px ${theme.glow}` }}
                >
                  <HabitIcon name={habit.icon} className="w-5 h-5 text-white" strokeWidth={2.25} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm tracking-wide truncate ${isCompleted ? "line-through text-slate-400" : "text-white"}`}>
                      {habit.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    {habit.category && (
                      <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md border border-white/10 bg-white/5 uppercase ${theme.text}`}>
                        {habit.category}
                      </span>
                    )}
                    {habit.targetDescription && (
                      <span className="text-xs text-slate-400 truncate">
                        • {habit.targetDescription}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Completion Check */}
              <div className="flex items-center gap-3 ml-3 shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>1d</span>
                </div>

                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-400 text-slate-950 scale-105 shadow-lg shadow-emerald-500/40"
                    : "border-slate-600 group-hover:border-cyan-400 bg-black/20"
                }`}>
                  {isCompleted && <Check className="w-5 h-5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}

        {filteredHabits.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">
            No habits in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyChecklist;