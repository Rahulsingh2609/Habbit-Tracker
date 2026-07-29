import React from 'react';
import type { UserStats } from '../types/habit';
import { Flame, Trophy, Zap, Award, Target, CheckCircle2 } from 'lucide-react';

interface ProfileStreaksProps {
  stats: UserStats;
}

export const ProfileStreaks: React.FC<ProfileStreaksProps> = ({ stats }) => {
  const achievements = [
    {
      title: 'First Step',
      desc: 'Complete your first habit log',
      unlocked: stats.totalCompletions >= 1,
      icon: Target,
    },
    {
      title: 'Consistency Master',
      desc: 'Reach a 7-day streak',
      unlocked: stats.bestStreak >= 7,
      icon: Flame,
    },
    {
      title: 'DSA & Dev Grind',
      desc: 'Complete 25 coding/study sessions',
      unlocked: stats.totalCompletions >= 25,
      icon: Zap,
    },
    {
      title: 'Habit Champion',
      desc: 'Log over 100 habit completions',
      unlocked: stats.totalCompletions >= 100,
      icon: Trophy,
    },
  ];

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto space-y-5">
      {/* Profile Level Header */}
      <div className="glass-card p-5 bg-gradient-to-br from-purple-950/50 via-slate-900 to-indigo-950/60 relative overflow-hidden text-center space-y-2">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 shadow-xl shadow-purple-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl font-black text-amber-400">
            L{stats.level}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-white">Habit Warrior</h2>
          <p className="text-xs text-indigo-300 font-semibold">{stats.xp} Total XP Earned</p>
        </div>

        {/* Level XP Bar */}
        <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800 mt-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${(stats.xp % 250) / 2.5}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400">
          {250 - (stats.xp % 250)} XP to reach Level {stats.level + 1}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-3 text-center space-y-1">
          <div className="w-8 h-8 mx-auto rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-white">{stats.currentStreak}d</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Current Streak</div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <div className="w-8 h-8 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-white">{stats.bestStreak}d</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Best Streak</div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-white">{stats.totalCompletions}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Completions</div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Achievements & Trophies
        </h3>

        <div className="space-y-2.5">
          {achievements.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                  item.unlocked
                    ? 'bg-slate-900/80 border-indigo-500/30'
                    : 'bg-slate-950/40 border-slate-800 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.unlocked ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-100">{item.title}</h4>
                    {item.unlocked && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
