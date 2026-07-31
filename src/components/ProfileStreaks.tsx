import { useState } from 'react';
import { User, Phone, GraduationCap, Calendar, Edit3, Check, LogOut, Flame, Trophy, Award, Mail } from 'lucide-react';
import type { UserProfile } from '../types/user';

interface Props {
  userProfile: UserProfile;
  userEmail?: string;
  onSaveProfile: (profile: UserProfile) => void;
  onLogout?: () => void | Promise<void>;
  totalCompletedHabits?: number;
}

export function ProfileStreaks({ userProfile, userEmail, onSaveProfile, onLogout, totalCompletedHabits = 0 }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ ...formData, isProfileComplete: true });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Profile Card Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-white/10 p-6 backdrop-blur-xl shadow-2xl space-y-6 animate-fade-in-up">
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-cyan-500/20">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{userProfile.name || 'User Profile'}</h2>
              <p className="text-xs font-semibold text-cyan-400">{userProfile.college || 'Student'}</p>
              {userEmail && (
                <p className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <Mail className="w-3 h-3" /> {userEmail}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {onLogout && (
              <button
                onClick={() => setConfirmingLogout(true)}
                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 animate-fade-in-up">
            <div className="space-y-2">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="College / Institution"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Details
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate">{userProfile.phone || 'No phone set'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate">{userProfile.college || 'No college set'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Age: {userProfile.age || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Status: Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Streak Achievements Showcase */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
          <Flame className="w-6 h-6 text-amber-400 mx-auto" />
          <div className="text-xl font-black text-white">{totalCompletedHabits}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Done</div>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto" />
          <div className="text-xl font-black text-white">Master</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Rank</div>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
          <Award className="w-6 h-6 text-cyan-400 mx-auto" />
          <div className="text-xl font-black text-white">Level 3</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Tier</div>
        </div>
      </div>

      {/* Logout Confirmation */}
      {confirmingLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in-up">
          <div className="w-full max-w-xs bg-slate-900 border border-white/10 rounded-2xl p-5 text-center shadow-2xl">
            <LogOut className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-white font-bold text-sm mb-1">Log out?</h3>
            <p className="text-slate-400 text-xs mb-4">You'll need to sign in again to see your habits.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingLogout(false)}
                className="flex-1 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmingLogout(false);
                  onLogout?.();
                }}
                className="flex-1 py-2 rounded-xl bg-red-500/90 text-white text-xs font-semibold hover:bg-red-500 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileStreaks;