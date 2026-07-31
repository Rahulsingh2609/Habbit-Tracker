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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
      {/* Floating Background Emojis */}
      <div className="absolute top-[10%] left-[8%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block">🎯</div>
      <div className="absolute top-[18%] right-[10%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '1s' }}>🔥</div>
      <div className="absolute bottom-[15%] left-[12%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '2s' }}>🏆</div>
      <div className="absolute bottom-[22%] right-[8%] text-3xl opacity-20 pointer-events-none animate-float hidden sm:block" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-1/2 left-[4%] text-2xl opacity-15 pointer-events-none animate-bounce-slow hidden sm:block">💪</div>
      <div className="absolute top-1/2 right-[4%] text-2xl opacity-15 pointer-events-none animate-bounce-slow hidden sm:block" style={{ animationDelay: '0.7s' }}>📚</div>

      {/* Modal Card — Frameless Title Header & Premium Glassmorphism */}
      <div className="relative w-full max-w-lg my-8 bg-slate-900/90 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl overflow-hidden transition-all">
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Frameless Header Section */}
        <div className="relative text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-medium text-sm tracking-wide mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Welcome Onboard! 👋</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Create Your Profile
          </h2>

          <p className="text-sm text-slate-300/80 max-w-md mx-auto text-center leading-relaxed">
            Set up your account details to start tracking habits and earning streak badges. 🚀
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="relative space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 rounded-2xl px-3.5 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
              <User className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Singh"
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 rounded-2xl px-3.5 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
              <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 9876543210"
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* College & Age Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                College / Institution *
              </label>
              <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 rounded-2xl px-3.5 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. ABV-IIITM Gwalior"
                  className="w-full bg-transparent py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none truncate"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Age
              </label>
              <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-2xl px-3 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="20"
                  className="w-full bg-transparent py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 font-bold text-base tracking-wide text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}