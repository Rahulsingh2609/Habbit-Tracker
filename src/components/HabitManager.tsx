import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Zap } from 'lucide-react';
import type { Habit } from '../types/habit';

interface Props {
  habits: Habit[];
  onSaveHabits: (habits: Habit[]) => void;
}

const PRESETS = [
  { name: 'Morning Gym', category: 'FITNESS', icon: '🏋️‍♂️', target: '45 mins' },
  { name: 'LeetCode / Dev', category: 'LEARNING', icon: '💻', target: '2 problems' },
  { name: 'Read Book', category: 'LEARNING', icon: '📚', target: '15 mins' },
  { name: 'Drink 3L Water', category: 'HEALTH', icon: '💧', target: '3 Liters' },
];

export function HabitManager({ habits, onSaveHabits }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('FITNESS');
  const [target, setTarget] = useState('');
  const [icon, setIcon] = useState('⚡');

  const handleNameChange = (val: string) => {
    setName(val);
    const low = val.toLowerCase();
    if (low.includes('gym') || low.includes('workout')) { setIcon('🏋️‍♂️'); setCategory('FITNESS'); }
    else if (low.includes('code') || low.includes('study')) { setIcon('💻'); setCategory('LEARNING'); }
    else if (low.includes('water')) { setIcon('💧'); setCategory('HEALTH'); }
    else if (low.includes('read')) { setIcon('📚'); setCategory('LEARNING'); }
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      icon,
      ...(target ? { target } : {}),
    } as any;

    onSaveHabits([...habits, newHabit]);
    setName('');
    setTarget('');
  };

  const handleAddPreset = (preset: typeof PRESETS[0]) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: preset.name,
      category: preset.category,
      icon: preset.icon,
      target: preset.target,
    } as any;

    onSaveHabits([...habits, newHabit]);
  };

  const handleDelete = (id: string) => {
    onSaveHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Quick Add Presets */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-cyan-400" />
          Quick Add Presets
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleAddPreset(preset)}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-left transition-all group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{preset.icon}</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{preset.name}</div>
                <div className="text-[10px] text-slate-400">{preset.target}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Habit Creator */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
          <Sparkles className="w-4 h-4" />
          Create New Habit
        </div>

        <form onSubmit={handleAddHabit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Habit title (e.g. Read 10 pages)"
              className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
            <div className="w-12 h-10 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center text-xl">
              {icon}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-950/80 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="FITNESS">Fitness 🏋️</option>
              <option value="HEALTH">Health 🥗</option>
              <option value="LEARNING">Learning 💻</option>
              <option value="ROUTINE">Routine ⏰</option>
            </select>

            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target (e.g. 30 mins)"
              className="bg-slate-950/80 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-white shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Habit
          </button>
        </form>
      </div>

      {/* Active Habits List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Your Active Habits ({habits.length})</h3>
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{habit.icon || '⚡'}</span>
              <div>
                <div className="text-sm font-bold text-white">{habit.name}</div>
                <div className="text-[10px] text-cyan-400 uppercase font-semibold">{habit.category}</div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(habit.id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitManager;