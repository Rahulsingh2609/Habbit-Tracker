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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Glowing Ambient Background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Welcome Onboard!
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Your Profile</h2>
          <p className="text-xs text-slate-400">Set up your account details to start tracking habits and earning streak badges.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Singh"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 9876543210"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">College / Institution *</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. ABV-IIITM Gwalior"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="20"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 font-bold text-sm text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}