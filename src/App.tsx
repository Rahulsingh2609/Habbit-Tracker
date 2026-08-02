import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  PlusCircle, 
  Flame, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Activity,
  Apple,
  GraduationCap,
  Dumbbell,
  Utensils,
  Code,
  Laptop,
  Check,
  X,
  LogOut,
  Award,
  BarChart2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Camera,
  Phone,
  BookOpen,
  CheckCircle,
  Sparkles,
  Edit3
} from 'lucide-react';

interface Habbit {
  id: string;
  name: string;
  category: string;
  subtext: string;
  streak: number;
  completed: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

interface WeeklyMilestone {
  id: string;
  title: string;
  category: string;
  emoji: string;
  completed: boolean;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Profile Details State
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');
  const [userMobile, setUserMobile] = useState<string>(() => localStorage.getItem('userMobile') || '+91 ');
  const [userAge, setUserAge] = useState<string>(() => localStorage.getItem('userAge') || ' ');
  const [userCollege, setUserCollege] = useState<string>(() => localStorage.getItem('userCollege') || '');
  
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState<boolean>(false);

  // Profile Image State with Persistent Storage
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem('profileImage') || null;
  });

  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'habbits' | 'streaks' | 'profile'>('today');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Habbits');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State for Adding Habbits
  const [newHabbitName, setNewHabbitName] = useState('');
  const [newHabbitCategory, setNewHabbitCategory] = useState('ROUTINE');
  const [newHabbitSubtext, setNewHabbitSubtext] = useState('');

  // Weekly Milestones State
  const [weeklyMilestones, setWeeklyMilestones] = useState<WeeklyMilestone[]>([
    { id: '1', title: 'Complete 5 Workout Sessions', category: 'Fitness', emoji: '🏋️‍♂️', completed: false },
    { id: '2', title: 'Maintain 7+ Hours Sleep Daily', category: 'Health', emoji: '🌙', completed: false },
    { id: '3', title: 'Finish 10 LeetCode Problems', category: 'Study', emoji: '💻', completed: false },
    { id: '4', title: 'Eat Clean Protein Meals', category: 'Health', emoji: '🥗', completed: false },
    { id: '5', title: 'Read 30 Pages of Technical Book', category: 'Study', emoji: '📚', completed: false },
  ]);

  // Default Habbits
  const [habbits, setHabbits] = useState<Habbit[]>([
    { id: '1', name: 'Early Wakeup', category: 'ROUTINE', subtext: '6:00 AM', streak: 0, completed: false, icon: <Sun style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #9333ea, #6366f1)' },
    { id: '2', name: 'Running', category: 'FITNESS', subtext: '5 km run', streak: 0, completed: false, icon: <Activity style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '3', name: 'Healthy Breakfast', category: 'HEALTH', subtext: 'High protein', streak: 0, completed: false, icon: <Apple style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '4', name: 'College Prep', category: 'LEARNING', subtext: 'Lectures & notes', streak: 0, completed: false, icon: <GraduationCap style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '5', name: 'Gym Training', category: 'FITNESS', subtext: 'Heavy lifting', streak: 0, completed: false, icon: <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '6', name: 'Clean Diet', category: 'HEALTH', subtext: 'Zero junk food', streak: 0, completed: false, icon: <Utensils style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '7', name: 'DSA & Coding', category: 'LEARNING', subtext: 'LeetCode practice', streak: 0, completed: false, icon: <Code style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '8', name: 'Web Dev Project', category: 'LEARNING', subtext: 'Build features', streak: 0, completed: false, icon: <Laptop style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
  ]);

  const toggleHabbit = (id: string) => {
    setHabbits(habbits.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        return { 
          ...h, 
          completed: nextState, 
          streak: nextState ? h.streak + 1 : Math.max(0, h.streak - 1) 
        };
      }
      return h;
    }));
  };

  const toggleMilestone = (id: string) => {
    setWeeklyMilestones(weeklyMilestones.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      setUserName('User');
    }
    setIsLoggedIn(true);
  };

  const handleSaveProfileSetup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    localStorage.setItem('userMobile', userMobile);
    localStorage.setItem('userAge', userAge);
    localStorage.setItem('userCollege', userCollege);
    setIsProfileSetupOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddHabbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabbitName.trim()) return;

    let icon = <Activity style={{ width: 20, height: 20, color: 'white' }} />;
    let iconBg = 'linear-gradient(135deg, #9333ea, #6366f1)';

    if (newHabbitCategory === 'FITNESS') {
      icon = <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #ea580c, #f59e0b)';
    } else if (newHabbitCategory === 'HEALTH') {
      icon = <Apple style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #059669, #2dd4bf)';
    } else if (newHabbitCategory === 'LEARNING') {
      icon = <Code style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #2563eb, #22d3ee)';
    }

    const newHabbitObj: Habbit = {
      id: Date.now().toString(),
      name: newHabbitName,
      category: newHabbitCategory,
      subtext: newHabbitSubtext || 'Daily Target',
      streak: 0,
      completed: false,
      icon,
      iconBg
    };

    setHabbits([...habbits, newHabbitObj]);
    setNewHabbitName('');
    setNewHabbitSubtext('');
    setIsAddModalOpen(false);
  };

  // Safe Progress Calculations
  const completedCount = habbits.filter(h => h.completed).length;
  const progressPercentage = habbits.length > 0 ? Math.round((completedCount / habbits.length) * 100) : 0;

  const completedMilestonesCount = weeklyMilestones.filter(m => m.completed).length;
  const milestonesPercentage = weeklyMilestones.length > 0 ? Math.round((completedMilestonesCount / weeklyMilestones.length) * 100) : 0;

  const weeklyData = [
    { day: 'Mon', completed: 2, total: 8, percentage: 25 },
    { day: 'Tue', completed: 4, total: 8, percentage: 50 },
    { day: 'Wed', completed: 3, total: 8, percentage: 38 },
    { day: 'Thu', completed: 6, total: 8, percentage: 75 },
    { day: 'Fri', completed: 5, total: 8, percentage: 62 },
    { day: 'Sat', completed: completedCount, total: habbits.length, percentage: progressPercentage },
    { day: 'Sun', completed: 0, total: 8, percentage: 0 },
  ];

  if (!isLoggedIn) {
    return (
      <div style={{
        position: 'relative',
        backgroundColor: '#0a0d18',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        
        <style>{`
          @keyframes floatEmoji {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.25; }
            50% { transform: translateY(-25px) rotate(15deg); opacity: 0.7; }
            100% { transform: translateY(0px) rotate(0deg); opacity: 0.25; }
          }
          .floating-emoji {
            position: absolute;
            user-select: none;
            pointer-events: none;
            animation: floatEmoji 6s ease-in-out infinite;
          }
        `}</style>

        <div className="floating-emoji" style={{ top: '8%', left: '10%', fontSize: '32px', animationDelay: '0s' }}>🏋️‍♂️</div>
        <div className="floating-emoji" style={{ top: '18%', right: '12%', fontSize: '36px', animationDelay: '1.5s' }}>🍏</div>
        <div className="floating-emoji" style={{ bottom: '28%', left: '8%', fontSize: '28px', animationDelay: '3s' }}>📚</div>
        <div className="floating-emoji" style={{ bottom: '15%', right: '10%', fontSize: '34px', animationDelay: '0.8s' }}>💻</div>

        <div style={{ maxWidth: '420px', width: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
          
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'conic-gradient(from 180deg, #38bdf8, #818cf8, #38bdf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.35)',
            marginBottom: '20px'
          }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0d18', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check style={{ width: '32px', height: '32px', color: '#38bdf8', strokeWidth: 3 }} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#00d8f6', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '6px' }}>
              WELCOME BACK
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Habbit Tracker
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0', lineHeight: '1.6' }}>
              Build better habbits.<br />
              Stay consistent.<br />
              Become unstoppable. 🚀
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '4px',
            display: 'flex',
            width: '100%',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}>
            <button
              onClick={() => setAuthTab('login')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '20px',
                border: 'none',
                background: authTab === 'login' ? 'linear-gradient(90deg, #7c3aed, #06b6d4)' : 'transparent',
                color: authTab === 'login' ? '#ffffff' : '#94a3b8',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: authTab === 'login' ? '0 0 15px rgba(124, 58, 237, 0.4)' : 'none'
              }}
            >
              Login
            </button>
            <button
              onClick={() => setAuthTab('register')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '20px',
                border: 'none',
                background: authTab === 'register' ? 'linear-gradient(90deg, #7c3aed, #06b6d4)' : 'transparent',
                color: authTab === 'register' ? '#ffffff' : '#94a3b8',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: authTab === 'register' ? '0 0 15px rgba(124, 58, 237, 0.4)' : 'none'
              }}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {authTab === 'register' && (
              <div style={{
                backgroundColor: '#121829',
                border: '1px solid #1e293d',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <User style={{ width: '20px', height: '20px', color: '#64748b' }} />
                <input 
                  type="text"
                  required
                  placeholder="Enter your Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '14px', width: '100%' }}
                />
              </div>
            )}

            <div style={{
              backgroundColor: '#121829',
              border: '1px solid #1e293d',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Mail style={{ width: '20px', height: '20px', color: '#64748b' }} />
              <input 
                type="email"
                required
                placeholder="Enter your Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '14px', width: '100%' }}
              />
            </div>

            <div style={{
              backgroundColor: '#121829',
              border: '1px solid #1e293d',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Lock style={{ width: '20px', height: '20px', color: '#64748b' }} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '14px', width: '100%' }}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', margin: '4px 0 8px 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', cursor: 'pointer' }}>
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#06b6d4', width: '14px', height: '14px', borderRadius: '4px' }}
                />
                Remember Me
              </label>
              <a href="#forgot" style={{ color: '#00d8f6', textDecoration: 'none', fontWeight: 'bold' }}>
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(90deg, #6366f1, #a855f7 50%, #06b6d4)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(99, 102, 241, 0.35)'
              }}
            >
              <span>{authTab === 'login' ? 'Login' : 'Create Account'}</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#94a3b8' }}>
            <span>{authTab === 'login' ? "Don't have an account? " : "Already have an account? "}</span>
            <button
              onClick={() => setAuthTab(authTab === 'login' ? 'register' : 'login')}
              style={{ background: 'none', border: 'none', color: '#00d8f6', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {authTab === 'login' ? 'Create one' : 'Log in'}
            </button>
          </div>

        </div>

        <footer style={{ textAlign: 'center', zIndex: 10, paddingTop: '20px' }}>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 4px 0', letterSpacing: '0.02em' }}>
            @2026 Build by Rahul Singh
          </p>
        </footer>

      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#070b12', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', borderLeft: '1px solid #1e293b', borderRight: '1px solid #1e293b' }}>

        {/* HEADER */}
        <header style={{ padding: '20px 24px 12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f172a' }}>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <ChevronLeft style={{ width: 20, height: 20 }} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#22d3ee', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Calendar style={{ width: 14, height: 14 }} />
              <span>{activeTab.toUpperCase()} VIEW</span>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0', color: '#ffffff' }}>Sat, Aug 1</h1>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </header>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: '20px 16px 100px 16px', overflowY: 'auto' }}>
          
          {/* TODAY TAB */}
          {activeTab === 'today' && (
            <>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}>
                    <Activity style={{ width: 16, height: 16 }} />
                    <span>Daily Progress</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                    {completedCount} <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#94a3b8' }}>of {habbits.length}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Habbits Completed</div>
                </div>

                <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      stroke="#22d3ee" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={201}
                      strokeDashoffset={201 - (201 * progressPercentage) / 100}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                  </svg>
                  <span style={{ position: 'absolute', fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{progressPercentage}%</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '8px' }}>
                {['All Habbits', 'Fitness', 'Health', 'Learning', 'Routine'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                      whiteSpace: 'nowrap',
                      border: selectedCategory === cat ? 'none' : '1px solid #1e293b',
                      backgroundColor: selectedCategory === cat ? '#06b6d4' : '#0f172a',
                      color: selectedCategory === cat ? '#000000' : '#94a3b8',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {habbits
                  .filter(h => selectedCategory === 'All Habbits' || h.category.toLowerCase() === selectedCategory.toLowerCase())
                  .map((habbit) => (
                    <div
                      key={habbit.id}
                      style={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '16px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: habbit.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {habbit.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px', color: '#ffffff' }}>{habbit.name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#1e293b', color: '#22d3ee', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                              {habbit.category}
                            </span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>• {habbit.subtext}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '4px 10px', borderRadius: '12px' }}>
                          <Flame style={{ width: 14, height: 14, color: '#f59e0b', fill: '#f59e0b' }} />
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b' }}>{habbit.streak}d</span>
                        </div>

                        <button
                          onClick={() => toggleHabbit(habbit.id)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: habbit.completed ? 'none' : '2px solid #475569',
                            backgroundColor: habbit.completed ? '#06b6d4' : 'transparent',
                            color: habbit.completed ? '#000000' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {habbit.completed && <Check style={{ width: 16, height: 16, strokeWidth: 3 }} />}
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </>
          )}

          {/* WEEKLY REPORT TAB */}
          {activeTab === 'weekly' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid #312e81', borderRadius: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '12px', fontWeight: 'bold' }}>
                      <Sparkles style={{ width: 14, height: 14 }} />
                      <span>PREMIUM REPORT</span>
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '4px 0 0 0', color: '#ffffff' }}>Weekly Performance</h2>
                  </div>
                  <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid #0284c7', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#38bdf8' }}>
                    {progressPercentage}% Completed
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <Award style={{ width: 20, height: 20, color: '#f59e0b', margin: '0 auto 4px auto' }} />
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{Math.max(...habbits.map(h => h.streak))} Days</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Best Streak</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '18px' }}>🎯</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{completedCount} / {habbits.length}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Habbits Today</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '18px' }}>🏆</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{completedMilestonesCount} / {weeklyMilestones.length}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Milestones</div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart2 style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>Daily Consistency Graph</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingBottom: '10px', gap: '8px' }}>
                  {weeklyData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end', flex: 1 }}>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{d.percentage}%</span>
                      <div style={{ width: '100%', maxWidth: '28px', backgroundColor: '#1e293b', height: '100%', borderRadius: '8px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
                        <div style={{ width: '100%', background: d.day === 'Sat' ? 'linear-gradient(180deg, #38bdf8, #0284c7)' : 'linear-gradient(180deg, #818cf8, #4f46e5)', height: `${d.percentage}%`, borderRadius: '8px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: d.day === 'Sat' ? '#38bdf8' : '#94a3b8' }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle style={{ width: 18, height: 18, color: '#10b981' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>Weekly Goal Milestones</h3>
                  </div>
                  {/* ✅ Option 1 applied: Render milestonesPercentage here */}
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
                    {milestonesPercentage}% Done
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {weeklyMilestones.map((milestone) => (
                    <div 
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      style={{
                        backgroundColor: milestone.completed ? 'rgba(6, 182, 212, 0.08)' : '#121829',
                        border: milestone.completed ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid #1e293b',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>{milestone.emoji}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: milestone.completed ? '#22d3ee' : '#ffffff', textDecoration: milestone.completed ? 'line-through' : 'none' }}>
                            {milestone.title}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: milestone.completed ? 'none' : '2px solid #475569', backgroundColor: milestone.completed ? '#06b6d4' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {milestone.completed && <Check style={{ width: 14, height: 14, strokeWidth: 3 }} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HABBITS TAB */}
          {activeTab === 'habbits' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                style={{ width: '100%', padding: '14px', backgroundColor: '#06b6d4', color: '#000000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <PlusCircle style={{ width: 18, height: 18 }} />
                <span>Add New Habbit</span>
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {habbits.map((h) => (
                  <div key={h.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{h.name}</span>
                    <button onClick={() => setHabbits(habbits.filter(item => item.id !== h.id))} style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '12px' }}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STREAKS TAB */}
          {activeTab === 'streaks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {habbits.map((habbit) => (
                <div key={habbit.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{habbit.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{habbit.category}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 'bold', fontSize: '14px', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                    <Flame style={{ width: 16, height: 16, fill: '#f59e0b' }} />
                    <span>{habbit.streak} Days</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 14px auto' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#06b6d4', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#000000' }}>
                    {profileImage ? <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (userName ? userName.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <label htmlFor="profile-photo-upload" style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#0f172a', border: '1px solid #22d3ee', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}>
                    <Camera style={{ width: '14px', height: '14px', color: '#22d3ee' }} />
                    <input id="profile-photo-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>{userName || 'User Name'}</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{emailInput || 'user@example.com'}</p>

                <button onClick={() => setIsProfileSetupOpen(true)} style={{ marginTop: '12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Edit3 style={{ width: 14, height: 14 }} />
                  <span>Edit Profile Details</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Mobile Number</div>
                    <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '600' }}>{userMobile}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User style={{ width: '18px', height: '18px', color: '#a855f7' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Age</div>
                    <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '600' }}>{userAge} Years</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BookOpen style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>College / Institute</div>
                    <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '600' }}>{userCollege}</div>
                  </div>
                </div>
              </div>

              <button onClick={handleLogout} style={{ width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#f43f5e', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
                <LogOut style={{ width: 18, height: 18 }} />
                <span>Log Out</span>
              </button>
            </div>
          )}

        </main>

        {/* EDIT PROFILE MODAL */}
        {isProfileSetupOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(7, 11, 18, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '16px' }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', width: '100%', maxWidth: '400px', padding: '28px', position: 'relative' }}>
              <button onClick={() => setIsProfileSetupOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Update Profile</h2>

              <form onSubmit={handleSaveProfileSetup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293d', borderRadius: '12px', padding: '12px 14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Mobile Number</label>
                  <input type="tel" required value={userMobile} onChange={(e) => setUserMobile(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293d', borderRadius: '12px', padding: '12px 14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Age</label>
                  <input type="number" required value={userAge} onChange={(e) => setUserAge(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293d', borderRadius: '12px', padding: '12px 14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>College / Institute</label>
                  <input type="text" required value={userCollege} onChange={(e) => setUserCollege(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293d', borderRadius: '12px', padding: '12px 14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #06b6d4, #6366f1)', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  Save Details
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADD HABBIT MODAL */}
        {isAddModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '24px', position: 'relative' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Create New Habbit</h2>
              
              <form onSubmit={handleAddHabbit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Habbit Name</label>
                  <input type="text" required placeholder="e.g., Morning Meditation" value={newHabbitName} onChange={(e) => setNewHabbitName(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Category</label>
                  <select value={newHabbitCategory} onChange={(e) => setNewHabbitCategory(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }}>
                    <option value="ROUTINE">Routine</option>
                    <option value="FITNESS">Fitness</option>
                    <option value="HEALTH">Health</option>
                    <option value="LEARNING">Learning</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Subtext / Goal</label>
                  <input type="text" placeholder="e.g., 10 minutes daily" value={newHabbitSubtext} onChange={(e) => setNewHabbitSubtext(e.target.value)} style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', backgroundColor: '#06b6d4', color: '#000000', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                  Save Habbit
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: '#0b0f19', borderTop: '1px solid #1e293b', padding: '10px 0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => setActiveTab('today')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'today' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <Calendar style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Today</span>
          </button>
          <button onClick={() => setActiveTab('weekly')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'weekly' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <TrendingUp style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Weekly</span>
          </button>
          <button onClick={() => { setActiveTab('habbits'); setIsAddModalOpen(true); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'habbits' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <PlusCircle style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Habbits</span>
          </button>
          <button onClick={() => setActiveTab('streaks')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'streaks' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <Flame style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Streaks</span>
          </button>
          <button onClick={() => setActiveTab('profile')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'profile' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <User style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}