import React, { useState } from "react";
import {
  Flame,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sun,
  Activity,
  Apple,
  GraduationCap,
  Dumbbell,
  HeartPulse,
  Utensils,
  Soup,
  Code2,
  Calendar,
  BarChart2,
  PlusCircle,
  Award,
  Sparkles,
  Check,
} from "lucide-react";

// Types
interface Habit {
  id: string;
  name: string;
  category: "FITNESS" | "HEALTH" | "LEARNING" | "ROUTINE";
  target: string;
  unit?: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  completed: boolean;
  value?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All Habits");
  const [navTab, setNavTab] = useState("Today");

  // Sample habit list matching your UI
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Early Wakeup",
      category: "ROUTINE",
      target: "6:00 AM",
      icon: <Sun className="w-5 h-5 text-amber-300" />,
      gradient: "from-amber-500 to-orange-600",
      glowColor: "rgba(245,158,11,0.25)",
      completed: false,
    },
    {
      id: "2",
      name: "Running",
      category: "FITNESS",
      target: "5 km run",
      unit: "km",
      icon: <Activity className="w-5 h-5 text-emerald-300" />,
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.25)",
      completed: false,
    },
    {
      id: "3",
      name: "Healthy Breakfast",
      category: "HEALTH",
      target: "High protein & nutrients",
      icon: <Apple className="w-5 h-5 text-green-300" />,
      gradient: "from-green-500 to-emerald-600",
      glowColor: "rgba(34,197,94,0.25)",
      completed: true,
    },
    {
      id: "4",
      name: "College",
      category: "LEARNING",
      target: "Attend lectures & notes",
      icon: <GraduationCap className="w-5 h-5 text-cyan-300" />,
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6,182,212,0.25)",
      completed: false,
    },
    {
      id: "5",
      name: "Gym",
      category: "FITNESS",
      target: "Heavy weight training",
      unit: "mins",
      icon: <Dumbbell className="w-5 h-5 text-purple-300" />,
      gradient: "from-purple-500 to-indigo-600",
      glowColor: "rgba(168,85,247,0.25)",
      completed: false,
    },
    {
      id: "6",
      name: "Cardio",
      category: "FITNESS",
      target: "20 mins HIIT / Treadmill",
      unit: "mins",
      icon: <HeartPulse className="w-5 h-5 text-rose-300" />,
      gradient: "from-rose-500 to-red-600",
      glowColor: "rgba(244,63,94,0.25)",
      completed: false,
    },
    {
      id: "7",
      name: "Diet",
      category: "HEALTH",
      target: "Clean macros & zero junk",
      icon: <Utensils className="w-5 h-5 text-lime-300" />,
      gradient: "from-lime-500 to-green-600",
      glowColor: "rgba(132,204,22,0.25)",
      completed: false,
    },
    {
      id: "8",
      name: "Dinner",
      category: "HEALTH",
      target: "Light & before 8:30 PM",
      icon: <Soup className="w-5 h-5 text-orange-300" />,
      gradient: "from-orange-500 to-amber-600",
      glowColor: "rgba(249,115,22,0.25)",
      completed: false,
    },
    {
      id: "9",
      name: "DSA Practice",
      category: "LEARNING",
      target: "2 LeetCode problems",
      icon: <Code2 className="w-5 h-5 text-sky-300" />,
      gradient: "from-sky-500 to-blue-600",
      glowColor: "rgba(14,165,233,0.25)",
      completed: false,
    },
  ]);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  const filterTabs = [
    { label: "All Habits", icon: null },
    { label: "Fitness", icon: "🏋️" },
    { label: "Health", icon: "🥗" },
    { label: "Learning", icon: "💻" },
    { label: "Routine", icon: "⏰" },
  ];

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 flex flex-col items-center pb-28 font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#060813] to-[#060813] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-lg px-4 pt-4 space-y-5">

        {/* TOP HEADER */}
        <header className="flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-3 px-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide text-white leading-tight">
                Habit Tracker
              </h1>
              <p className="text-[10px] tracking-wider uppercase text-cyan-400 font-medium">
                Daily Routine & Output Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full shadow-inner">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
              <span className="text-xs font-bold text-orange-300">1d Streak</span>
            </div>
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* DATE SELECTOR BAR */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-2.5 px-4 backdrop-blur-md">
          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
              <Calendar className="w-3 h-3" />
              Today
            </div>
            <div className="text-base font-extrabold text-white tracking-wide">
              Fri, Jul 31
            </div>
          </div>

          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* DAILY PROGRESS HERO CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80 border border-white/10 p-5 backdrop-blur-xl shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Daily Goal Score
              </div>

              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {completedCount} <span className="text-lg text-slate-400 font-normal">of {habits.length}</span>
                </h2>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">
                  Completed Today
                </p>
              </div>

              <p className="text-xs text-slate-400">
                {habits.length - completedCount} habits remaining for today.
              </p>

              <button className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1 group transition-colors">
                View Weekly Output Report
                <TrendingUp className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800/80"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 38}
                  strokeDashoffset={
                    2 * Math.PI * 38 * (1 - progressPercent / 100)
                  }
                  strokeLinecap="round"
                  className="text-cyan-400 transition-all duration-700 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-white">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30"
                    : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 border border-white/5"
                }`}
              >
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* HABIT LIST CONTAINER */}
        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                habit.completed
                  ? "bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-950/20"
                  : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-cyan-500/30"
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {/* Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${habit.gradient} flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105`}
                  style={{ boxShadow: `0 4px 15px ${habit.glowColor}` }}
                >
                  {habit.icon}
                </div>

                {/* Habit Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-bold text-sm tracking-wide truncate ${
                        habit.completed
                          ? "line-through text-slate-400"
                          : "text-white"
                      }`}
                    >
                      {habit.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 uppercase">
                      {habit.category}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      Target: {habit.target}
                    </span>
                  </div>

                  {/* Input line if present */}
                  {habit.unit && !habit.completed && (
                    <div
                      className="mt-2 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        placeholder={`Enter ${habit.unit}`}
                        className="w-24 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <span className="text-xs font-semibold text-slate-400">
                        {habit.unit}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Toggle Button */}
              <div className="ml-3 shrink-0">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    habit.completed
                      ? "bg-emerald-500 border-emerald-400 text-slate-950 scale-105 shadow-lg shadow-emerald-500/40"
                      : "border-slate-600 group-hover:border-cyan-400 bg-black/20"
                  }`}
                >
                  {habit.completed && <Check className="w-5 h-5 stroke-[3]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FLOATING GLASS NAVIGATION DOCK */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs z-50">
        <div className="bg-[#0b0f19]/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-2 px-4 shadow-2xl flex items-center justify-around shadow-cyan-950/50">
          
          <button
            onClick={() => setNavTab("Today")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              navTab === "Today"
                ? "text-cyan-400 bg-cyan-500/10 px-4"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold">Today</span>
          </button>

          <button
            onClick={() => setNavTab("Report")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              navTab === "Report"
                ? "text-cyan-400 bg-cyan-500/10 px-4"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Report</span>
          </button>

          <button
            onClick={() => setNavTab("Habits")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              navTab === "Habits"
                ? "text-cyan-400 bg-cyan-500/10 px-4"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold">Habits</span>
          </button>

          <button
            onClick={() => setNavTab("Streaks")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              navTab === "Streaks"
                ? "text-cyan-400 bg-cyan-500/10 px-4"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] font-bold">Streaks</span>
          </button>

        </div>
      </nav>

    </div>
  );
}