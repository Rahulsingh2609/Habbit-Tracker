import React, { useState } from 'react';
import type { Habit, HabitCategory, HabitLog } from '../types/habit';
import { formatDate, getTodayString, getTodayLog } from '../utils/storage';
import { 
  Check, Sun, Footprints, Apple, GraduationCap, Dumbbell, 
  Activity, UtensilsCrossed, Soup, Code, Laptop, Moon,
  ChevronLeft, ChevronRight, Sparkles, Trophy, Calendar
} from 'lucide-react';

interface DailyChecklistProps {
  habits: Habit[];
  logs: Record<string, HabitLog>;
  onToggleHabit: (dateStr: string, habitId: string, metricValue?: number) => void;
  onOpenWeeklyReport: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sun,
  Footprints,
  Apple,
  GraduationCap,
  Dumbbell,
  Activity,
  UtensilsCrossed,
  Soup,
  Code,
  Laptop,
  Moon,
};

export const DailyChecklist: React.FC<DailyChecklistProps> = ({
  habits,
  logs,
  onToggleHabit,
  onOpenWeeklyReport,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | 'all'>('all');
  const [metricInputs, setMetricInputs] = useState<Record<string, number>>({});

  const dateStr = formatDate(selectedDate);
  const isToday = dateStr === getTodayString();
  const currentLog = getTodayLog(logs, dateStr);

  const completedCount = habits.filter((h) => currentLog.completedHabitIds.includes(h.id)).length;
  const totalHabits = habits.length;
  const completionPercentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  const filteredHabits = habits.filter((h) => {
    if (selectedCategory === 'all') return true;
    return h.category === selectedCategory;
  });

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleSetToday = () => {
    setSelectedDate(new Date());
  };

  const formattedDateHeader = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleMetricChange = (habitId: string, val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setMetricInputs((prev) => ({ ...prev, [habitId]: num }));
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto space-y-5">
      {/* Top Date Header & Navigation */}
      <div className="glass-card p-4 flex items-center justify-between">
        <button
          onClick={handlePrevDay}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center cursor-pointer" onClick={handleSetToday}>
          <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            {isToday ? 'Today' : 'Historical Entry'}
          </div>
          <div className="text-lg font-bold text-slate-100">{formattedDateHeader}</div>
        </div>

        <button
          onClick={handleNextDay}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Ring Hero Card */}
      <div className="glass-card p-5 relative overflow-hidden flex items-center justify-between bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80">
        <div className="space-y-1.5 max-w-[60%]">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Daily Goal Score
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {completionPercentage === 100 ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                All Done! <Trophy className="w-5 h-5 text-amber-400" />
              </span>
            ) : (
              `${completedCount} of ${totalHabits} Completed`
            )}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {completionPercentage === 100
              ? 'Awesome work! You completed all 11 daily habits.'
              : `${totalHabits - completedCount} habit${totalHabits - completedCount === 1 ? '' : 's'} remaining for today.`}
          </p>

          <button
            onClick={onOpenWeeklyReport}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-4"
          >
            View Weekly Output Report &rarr;
          </button>
        </div>

        {/* Circular SVG Progress */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-indigo-500 transition-all duration-700 ease-out"
              strokeDasharray={`${completionPercentage}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="url(#gradient)"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <span className="text-xl font-black text-white">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Habits' },
          { id: 'fitness', label: '🏋️ Fitness' },
          { id: 'health', label: '🥗 Health' },
          { id: 'learning', label: '💻 Learning' },
          { id: 'routine', label: '⏰ Routine' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Habit Items Checklist List */}
      <div className="space-y-3">
        {filteredHabits.map((habit) => {
          const isDone = currentLog.completedHabitIds.includes(habit.id);
          const IconComp = ICON_MAP[habit.icon] || Activity;
          const loggedVal = currentLog.habitMetrics?.[habit.id];

          return (
            <div
              key={habit.id}
              className={`glass-card p-4 transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${habit.color} shrink-0`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className={`font-bold text-base transition-colors truncate ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}>
                      {habit.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="bg-slate-800/80 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide text-slate-300 uppercase">
                        {habit.category}
                      </span>
                      <span>Target: {habit.targetDescription}</span>
                    </div>

                    {habit.unit && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          placeholder={`Enter ${habit.unit}`}
                          value={metricInputs[habit.id] ?? loggedVal ?? ''}
                          onChange={(e) => handleMetricChange(habit.id, e.target.value)}
                          className="w-24 px-2 py-1 text-xs rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                        <span className="text-xs text-slate-400 font-medium">{habit.unit}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const metricVal = metricInputs[habit.id] ?? loggedVal;
                    onToggleHabit(dateStr, habit.id, metricVal);
                  }}
                  className={`habit-checkbox shrink-0 ${isDone ? 'checked' : ''}`}
                  title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                >
                  {isDone && <Check className="w-5 h-5 text-white stroke-[3]" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
