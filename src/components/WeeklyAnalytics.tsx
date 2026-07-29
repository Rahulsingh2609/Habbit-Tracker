import React, { useState } from 'react';
import type { Habit, HabitLog } from '../types/habit';
import { calculateWeeklyReport } from '../utils/storage';
import { 
  ChevronLeft, ChevronRight, Check, X, Award, 
  TrendingUp, Calendar, Download, Sparkles, Flame 
} from 'lucide-react';
import { WeeklyReportModal } from './WeeklyReportModal';

interface WeeklyAnalyticsProps {
  habits: Habit[];
  logs: Record<string, HabitLog>;
}

export const WeeklyAnalytics: React.FC<WeeklyAnalyticsProps> = ({ habits, logs }) => {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const report = calculateWeeklyReport(habits, logs, weekOffset);

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => Math.min(prev + 1, 0));

  return (
    <div className="pb-24 pt-4 px-4 max-w-xl mx-auto space-y-5">
      {/* Week Selector Header */}
      <div className="glass-card p-4 flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 transition flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev Week
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            {weekOffset === 0 ? 'Current Week Output' : `${Math.abs(weekOffset)} Week${Math.abs(weekOffset) > 1 ? 's' : ''} Ago`}
          </div>
          <div className="text-base font-bold text-slate-100">{report.weekLabel}</div>
        </div>

        <button
          onClick={handleNextWeek}
          disabled={weekOffset === 0}
          className={`p-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
            weekOffset === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600'
              : 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-300'
          }`}
        >
          Next Week
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Score Card */}
      <div className="glass-card p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Weekly Performance
            </div>
            <h2 className="text-3xl font-black text-white mt-1">
              {report.overallCompletionPercentage}% <span className="text-sm font-semibold text-slate-400">Score</span>
            </h2>
            <p className="text-xs text-slate-300">
              Logged <strong className="text-emerald-400">{report.totalHabitsLogged}</strong> out of{' '}
              {report.totalPossibleHabits} habit targets completed this week.
            </p>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/40 transition flex items-center gap-2 text-xs font-bold shrink-0"
          >
            <Download className="w-4 h-4" />
            Report
          </button>
        </div>

        {/* Top Highlights badges */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Best Day
            </div>
            <div className="text-sm font-bold text-slate-100 truncate mt-0.5">{report.bestDay}</div>
          </div>

          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              Top Habit
            </div>
            <div className="text-sm font-bold text-slate-100 truncate mt-0.5">
              {report.topHabits[0] || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Monday - Sunday Habit Matrix Table */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" />
            Weekly Habit Matrix (Mon - Sun)
          </h3>
          <span className="text-xs text-slate-400">Completion Grid</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400">
                <th className="py-2 px-2 font-semibold">Habit</th>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <th key={day} className="py-2 px-1 text-center font-semibold">
                    {day}
                  </th>
                ))}
                <th className="py-2 px-2 text-right font-semibold">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {report.habitSummaries.map((summary) => (
                <tr key={summary.habit.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-2 font-medium text-xs text-slate-200 truncate max-w-[130px]">
                    <div className="truncate font-bold">{summary.habit.name}</div>
                    <div className="text-[10px] text-slate-500">{summary.habit.targetDescription}</div>
                  </td>

                  {summary.days.map((dayStatus, idx) => (
                    <td key={idx} className="py-2.5 px-1 text-center">
                      <div
                        className={`mx-auto matrix-cell ${
                          dayStatus.completed ? 'completed' : 'missed'
                        }`}
                      >
                        {dayStatus.completed ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 stroke-[2] opacity-40" />
                        )}
                      </div>
                    </td>
                  ))}

                  <td className="py-2.5 px-2 text-right font-extrabold text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        summary.percentage >= 80
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : summary.percentage >= 50
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {summary.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Habit Progress Bars */}
      <div className="glass-card p-4 space-y-4">
        <h3 className="font-bold text-sm text-slate-200">Habit Consistency Breakdown</h3>
        <div className="space-y-3">
          {report.habitSummaries.map((s) => (
            <div key={s.habit.id} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-200">{s.habit.name}</span>
                <span className="text-indigo-400">{s.completedCount}/7 Days ({s.percentage}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${s.habit.color}`}
                  style={{ width: `${s.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showReportModal && (
        <WeeklyReportModal report={report} onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
};
