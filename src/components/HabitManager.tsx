import React, { useState } from 'react';
import type { Habit, HabitCategory } from '../types/habit';
import { Plus, Trash2, X, Sparkles } from 'lucide-react';

interface HabitManagerProps {
  habits: Habit[];
  onAddHabit: (newHabit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
}

export const HabitManager: React.FC<HabitManagerProps> = ({
  habits,
  onAddHabit,
  onDeleteHabit,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('routine');
  const [targetDescription, setTargetDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [targetValue, setTargetValue] = useState<string>('');

  const colorGradients = [
    'from-indigo-500 to-purple-600',
    'from-emerald-400 to-teal-500',
    'from-rose-500 to-red-600',
    'from-amber-400 to-orange-500',
    'from-cyan-400 to-blue-600',
    'from-fuchsia-500 to-pink-600',
  ];
  const [selectedColor, setSelectedColor] = useState(colorGradients[0]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newHabit: Habit = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category,
      icon: 'Sparkles',
      targetDescription: targetDescription.trim() || 'Daily Target',
      unit: unit.trim() || undefined,
      targetValue: targetValue ? parseFloat(targetValue) : undefined,
      color: selectedColor,
      isCustom: true,
    };

    onAddHabit(newHabit);
    setName('');
    setTargetDescription('');
    setUnit('');
    setTargetValue('');
    setShowAddModal(false);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto space-y-5">
      {/* Header */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-lg text-white">Manage Daily Habits</h2>
          <p className="text-xs text-slate-400">Total {habits.length} habits configured</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          Add Habit
        </button>
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="glass-card p-4 flex items-center justify-between gap-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${habit.color}`}
              >
                {habit.name.charAt(0)}
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-sm text-slate-100 truncate">{habit.name}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="uppercase text-[10px] font-semibold text-indigo-400">
                    {habit.category}
                  </span>
                  <span>• {habit.targetDescription}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onDeleteHabit(habit.id)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition"
              title="Delete habit"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-md w-full p-5 space-y-4 bg-slate-900 border-indigo-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Add New Habit
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Habit Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read Books, Meditate, Water intake"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as HabitCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="fitness">Fitness</option>
                    <option value="health">Health</option>
                    <option value="learning">Learning</option>
                    <option value="routine">Routine</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 mins / 20 pages"
                    value={targetDescription}
                    onChange={(e) => setTargetDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Color Theme</label>
                <div className="flex gap-2">
                  {colorGradients.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(g)}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} ${
                        selectedColor === g ? 'ring-2 ring-white scale-110' : 'opacity-70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition"
                >
                  Save Habit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
