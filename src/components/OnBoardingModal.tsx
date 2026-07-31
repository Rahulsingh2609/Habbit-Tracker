import React, { useState } from 'react';
import { User, Phone, GraduationCap, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import type { UserProfile } from '../types/user';

interface Props {
  userProfile: UserProfile;
  onCompleteProfile: (profile: UserProfile) => void;
}

export function OnboardingModal({ userProfile, onCompleteProfile }: Props) {
  const [formData, setFormData] = useState<UserProfile>({
    name: userProfile.name || '',
    phone: userProfile.phone || '',
    college: userProfile.college || '',
    age: userProfile.age || '',
    isProfileComplete: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.college) return;
    onCompleteProfile({ ...formData, isProfileComplete: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      {/* Floating Background Emojis */}
      <div className="absolute top-[10%] left-[8%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block">🎯</div>
      <div className="absolute top-[18%] right-[10%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '1s' }}>🔥</div>
      <div className="absolute bottom-[15%] left-[12%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '2s' }}>🏆</div>
      <div className="absolute bottom-[22%] right-[8%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-1/2 left-[4%] text-2xl opacity-15 pointer-events-none animate-bounce-slow hidden sm:block">💪</div>
      <div className="absolute top-1/2 right-[4%] text-2xl opacity-15 pointer-events-none animate-bounce-slow hidden sm:block" style={{ animationDelay: '0.7s' }}>📚</div>

      {/* Modal Card — bigger premium frame */}
      <div className="relative w-full max-w-lg my-8 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-[2rem] p-8 shadow-2xl shadow-cyan-950/50 overflow-hidden animate-fade-in-up">
        {/* Glowing Ambient Background */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.2s' }} />

        <div className="relative text-center space-y-2.5 mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Welcome Onboard! 👋
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Create Your Profile</h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">Set up your account details to start tracking habits and earning streak badges. 🚀</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
            {/* Icon lives in its own flex box beside the input — cannot overlap the text,
                regardless of input height or font metrics. */}
            <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl focus-within:border-cyan-500 transition-colors">
              <div className="flex items-center justify-center w-11 h-11 shrink-0 text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Singh"
                className="w-full bg-transparent py-3 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
            <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl focus-within:border-cyan-500 transition-colors">
              <div className="flex items-center justify-center w-11 h-11 shrink-0 text-cyan-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 9876543210"
                className="w-full bg-transparent py-3 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / Institution *</label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl focus-within:border-cyan-500 transition-colors">
                <div className="flex items-center justify-center w-11 h-11 shrink-0 text-cyan-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. ABV-IIITM Gwalior"
                  className="w-full bg-transparent py-3 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl focus-within:border-cyan-500 transition-colors">
                <div className="flex items-center justify-center w-9 h-11 shrink-0 text-cyan-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="20"
                  className="w-full bg-transparent py-3 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 font-bold text-sm text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}