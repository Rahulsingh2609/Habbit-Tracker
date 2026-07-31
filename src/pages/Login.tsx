import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Dumbbell,
  BookOpen,
  Target,
  Trophy,
  Flame,
  Moon,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Mode = "login" | "signup";

function friendlyError(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account already exists with that email.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function Login() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setInfoMessage(null);
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    clearMessages();
    setMode(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please tell us your name.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(cred.user, { displayName: name.trim() });
        }
      }
    } catch (err: any) {
      setError(friendlyError(err?.code || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    clearMessages();
    if (!email) {
      setError("Enter your email above first, then tap 'Forgot Password?'");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMessage("Password reset email sent — check your inbox 📬");
    } catch (err: any) {
      setError(friendlyError(err?.code || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#050816] flex items-center justify-center overflow-y-auto"
      style={{ padding: "40px 16px" }}
    >
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050816] via-[#0b1128] to-[#031b25] pointer-events-none" />

      {/* Background Glows */}
      <div className="fixed -top-52 -left-52 h-[520px] w-[520px] rounded-full bg-purple-600/25 blur-[170px] pointer-events-none animate-pulse-slow" />
      <div className="fixed -bottom-52 -right-52 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[170px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      {/* Floating Bubbles */}
      <div className="absolute top-12 left-10 w-5 h-5 rounded-full bg-cyan-400/40 animate-pulse" />
      <div className="absolute top-40 left-32 w-3 h-3 rounded-full bg-purple-400 animate-bounce-slow" />
      <div className="absolute top-72 left-16 w-6 h-6 rounded-full bg-cyan-300/40 animate-pulse" />
      <div className="absolute top-24 right-12 w-4 h-4 rounded-full bg-indigo-400 animate-ping-slow" />
      <div className="absolute top-64 right-40 w-5 h-5 rounded-full bg-cyan-400 animate-pulse" />
      <div className="absolute bottom-32 right-20 w-6 h-6 rounded-full bg-purple-500/50 animate-bounce-slow" />
      <div className="absolute bottom-20 left-20 w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
      <div className="absolute bottom-56 left-52 w-3 h-3 rounded-full bg-pink-400 animate-ping-slow" />
      <div className="absolute bottom-16 right-52 w-5 h-5 rounded-full bg-cyan-500 animate-bounce-slow" />

      {/* Habit Watermark Icons */}
      <div className="absolute top-16 left-20 opacity-15 text-cyan-400 pointer-events-none hidden md:block animate-float">
        <Dumbbell size={70} />
      </div>
      <div className="absolute top-40 right-20 opacity-15 text-purple-400 pointer-events-none hidden md:block animate-float" style={{ animationDelay: "1s" }}>
        <BookOpen size={70} />
      </div>
      <div className="absolute bottom-28 left-16 opacity-15 text-cyan-300 pointer-events-none hidden md:block animate-float" style={{ animationDelay: "2s" }}>
        <Target size={70} />
      </div>
      <div className="absolute bottom-32 right-24 opacity-15 text-yellow-400 pointer-events-none hidden md:block animate-float" style={{ animationDelay: "0.5s" }}>
        <Trophy size={70} />
      </div>
      <div className="absolute top-[45%] left-[8%] opacity-15 text-orange-400 pointer-events-none hidden md:block animate-float" style={{ animationDelay: "1.5s" }}>
        <Flame size={60} />
      </div>
      <div className="absolute top-[55%] right-[10%] opacity-15 text-blue-300 pointer-events-none hidden md:block animate-float" style={{ animationDelay: "2.5s" }}>
        <Moon size={60} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md my-auto animate-fade-in-up">

        {/* SVG Logo */}
        <div className="flex justify-center" style={{ marginBottom: "20px" }}>
          <svg
            width="90"
            height="90"
            viewBox="0 0 120 120"
            className="drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] animate-float"
          >
            <defs>
              <linearGradient id="habitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            <circle
              cx="60" cy="60" r="46" fill="none" stroke="url(#habitGradient)"
              strokeWidth="8" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="45"
            />
            <path
              d="M42 60 L56 74 L82 48" fill="none" stroke="white" strokeWidth="7"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Headings */}
        <p className="text-center tracking-[6px] uppercase text-cyan-400 text-xs font-semibold">
          {mode === "login" ? "Welcome Back" : "Join the Journey"}
        </p>

        <h1
          className="text-center text-3xl font-black text-white tracking-tight"
          style={{ marginTop: "8px" }}
        >
          Habit Tracker
        </h1>

        <p
          className="text-center text-slate-400 text-sm leading-relaxed"
          style={{ marginTop: "12px", marginBottom: "24px" }}
        >
          Build better habits.<br />
          Stay consistent.<br />
          Become unstoppable. 🚀
        </p>

        {/* ================= MODE TOGGLE ================= */}
        <div
          className="relative flex rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-1"
          style={{ marginBottom: "22px" }}
        >
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 shadow-lg shadow-cyan-500/20 transition-transform duration-300 ease-out"
            style={{ transform: mode === "login" ? "translateX(0%)" : "translateX(calc(100% + 8px))" }}
          />
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`relative z-10 flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              mode === "login" ? "text-white" : "text-slate-400"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`relative z-10 flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              mode === "signup" ? "text-white" : "text-slate-400"
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ================= NAME (signup only) ================= */}
          {mode === "signup" && (
            <div className="relative animate-fade-in-up" style={{ marginBottom: "18px" }}>
              <div
                className="absolute pointer-events-none z-10 text-slate-400 flex items-center justify-center"
                style={{ left: "16px", top: "0", bottom: "0" }}
              >
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
                style={{ height: "54px", paddingLeft: "52px", paddingRight: "16px" }}
              />
            </div>
          )}

          {/* ================= EMAIL INPUT ================= */}
          <div className="relative" style={{ marginBottom: "18px" }}>
            <div
              className="absolute pointer-events-none z-10 text-slate-400 flex items-center justify-center"
              style={{ left: "16px", top: "0", bottom: "0" }}
            >
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
              style={{ height: "54px", paddingLeft: "52px", paddingRight: "16px" }}
            />
          </div>

          {/* ================= PASSWORD INPUT ================= */}
          <div className="relative" style={{ marginBottom: "18px" }}>
            <div
              className="absolute pointer-events-none z-10 text-slate-400 flex items-center justify-center"
              style={{ left: "16px", top: "0", bottom: "0" }}
            >
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
              style={{ height: "54px", paddingLeft: "52px", paddingRight: "52px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-slate-400 hover:text-cyan-300 transition flex items-center justify-center"
              style={{ right: "16px", top: "0", bottom: "0" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ================= ERROR / INFO MESSAGES ================= */}
          {error && (
            <div
              className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-3 py-2.5 animate-fade-in-up"
              style={{ marginBottom: "16px" }}
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {infoMessage && (
            <div
              className="flex items-start gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-2.5 animate-fade-in-up"
              style={{ marginBottom: "16px" }}
            >
              <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* ================= OPTIONS (login only) ================= */}
          {mode === "login" && (
            <div
              className="flex items-center justify-between text-xs"
              style={{ marginBottom: "24px", padding: "0 4px" }}
            >
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-200">
                <input type="checkbox" className="accent-cyan-500 w-4 h-4 rounded cursor-pointer" />
                Remember Me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-cyan-400 hover:text-cyan-300 transition font-medium"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* ================= SUBMIT BUTTON ================= */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 font-bold text-white text-base shadow-[0_10px_35px_rgba(34,211,238,0.25)] hover:scale-[1.01] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
            style={{ height: "52px", marginTop: mode === "signup" ? "6px" : "0" }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {mode === "login" ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              <>
                {mode === "login" ? "Login" : "Create Account"}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* ================= SWITCH MODE PROMPT ================= */}
        <p className="text-center text-slate-400 text-xs" style={{ marginTop: "18px" }}>
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => switchMode("signup")} className="text-cyan-400 font-semibold hover:text-cyan-300">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="text-cyan-400 font-semibold hover:text-cyan-300">
                Log in
              </button>
            </>
          )}
        </p>

        {/* ================= MOTIVATION CARD ================= */}
        <div
          className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 text-center"
          style={{ marginTop: "28px" }}
        >
          <div className="flex justify-center text-3xl" style={{ marginBottom: "8px" }}>
            🔥
          </div>
          <h3 className="text-white text-base font-bold" style={{ marginBottom: "6px" }}>
            Today's Motivation
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Success doesn't come from what you do occasionally.<br />
            It comes from what you do consistently.
          </p>
        </div>

        {/* ================= DAILY HABITS PREVIEW ================= */}
        <div
          className="grid grid-cols-4 gap-3"
          style={{ marginTop: "28px", marginBottom: "28px" }}
        >
          {[
            { icon: Dumbbell, label: "Workout", color: "text-cyan-400" },
            { icon: BookOpen, label: "Study", color: "text-purple-400" },
            { icon: Target, label: "Goals", color: "text-pink-400" },
            { icon: Moon, label: "Sleep", color: "text-blue-400" },
          ].map(({ icon: Icon, label, color }) => (
            <div className="flex flex-col items-center" key={label}>
              <div className="h-14 w-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:scale-105 transition-all">
                <Icon className={color} size={24} />
              </div>
              <span className="text-slate-400 text-[11px]" style={{ marginTop: "8px" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center" style={{ paddingTop: "8px" }}>
          <p className="text-slate-500 text-xs">
            Secure Authentication using Firebase 🔐
          </p>
          <p className="text-slate-600 text-[11px]" style={{ marginTop: "4px" }}>
            © 2026 Habit Tracker • Designed by Rahul Singh
          </p>
        </div>
      </div>
    </div>
  );
}