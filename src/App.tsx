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
  Check
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'habbits' | 'streaks' | 'profile'>('today');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Habbits');

  const [habbits, setHabbits] = useState<Habbit[]>([
    { id: '1', name: 'Early Wakeup', category: 'ROUTINE', subtext: '6:00 AM', streak: 1, completed: false, icon: <Sun style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #9333ea, #6366f1)' },
    { id: '2', name: 'Running', category: 'FITNESS', subtext: '5 km run', streak: 1, completed: false, icon: <Activity style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '3', name: 'Healthy Breakfast', category: 'HEALTH', subtext: 'High protein & nutrients', streak: 1, completed: false, icon: <Apple style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '4', name: 'College', category: 'LEARNING', subtext: 'Attend lectures & notes', streak: 1, completed: false, icon: <GraduationCap style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '5', name: 'Gym', category: 'FITNESS', subtext: 'Heavy weight training', streak: 1, completed: false, icon: <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '6', name: 'Cardio', category: 'FITNESS', subtext: '20 mins HIIT / Treadmill', streak: 1, completed: false, icon: <Activity style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '7', name: 'Diet', category: 'HEALTH', subtext: 'Clean macros & zero junk', streak: 1, completed: false, icon: <Utensils style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '8', name: 'DSA', category: 'LEARNING', subtext: '2 LeetCode problems', streak: 1, completed: false, icon: <Code style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '9', name: 'Web Dev', category: 'LEARNING', subtext: 'Build project features', streak: 1, completed: false, icon: <Laptop style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
  ]);

  const toggleHabbit = (id: string) => {
    setHabbits(habbits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedCount = habbits.filter(h => h.completed).length;
  const progressPercentage = Math.round((completedCount / habbits.length) * 100);

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
              <span>Today</span>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0', color: '#ffffff' }}>Sat, Aug 1</h1>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </header>

        {/* MAIN BODY */}
        <main style={{ flex: 1, padding: '20px 16px 100px 16px', overflowY: 'auto' }}>
          
          {activeTab === 'today' && (
            <>
              {/* PROGRESS CARD */}
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
                  
                  <button style={{ background: 'none', border: 'none', color: '#22d3ee', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>View Analytics Report</span>
                    <TrendingUp style={{ width: 14, height: 14 }} />
                  </button>
                </div>

                {/* CIRCULAR PROGRESS DIAL */}
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

              {/* CATEGORY TAGS */}
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

              {/* HABBIT ITEMS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
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

          {/* SEPARATE STREAKS VIEW */}
          {activeTab === 'streaks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <Flame style={{ width: 40, height: 40, color: '#f59e0b', fill: '#f59e0b', margin: '0 auto 8px auto' }} />
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Streak Leaderboard</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Track your continuous daily progress</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {habbits.map((habbit) => (
                  <div key={habbit.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: habbit.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {habbit.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#ffffff' }}>{habbit.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{habbit.category}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 'bold', fontSize: '14px', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <Flame style={{ width: 16, height: 16, fill: '#f59e0b' }} />
                      <span>{habbit.streak} Days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEPARATE PROFILE VIEW */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#06b6d4', borderRadius: '50%', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>
                  U
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>User Account</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>user@healthsphere.com</p>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #1e293b', color: '#e2e8f0', fontSize: '14px', cursor: 'pointer' }}>Account Settings</div>
                <div style={{ padding: '16px', borderBottom: '1px solid #1e293b', color: '#e2e8f0', fontSize: '14px', cursor: 'pointer' }}>Notifications & Reminders</div>
                <div style={{ padding: '16px', color: '#f43f5e', fontSize: '14px', cursor: 'pointer' }}>Log Out</div>
              </div>
            </div>
          )}

          {/* WEEKLY & HABBITS PLACEHOLDERS */}
          {activeTab === 'weekly' && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <TrendingUp style={{ width: 48, height: 48, color: '#22d3ee', margin: '0 auto 12px auto' }} />
              <h3 style={{ color: '#ffffff', margin: '0 0 8px 0' }}>Weekly Analytics</h3>
              <p style={{ fontSize: '14px' }}>Weekly progress charts will be shown here.</p>
            </div>
          )}

          {activeTab === 'habbits' && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <PlusCircle style={{ width: 48, height: 48, color: '#22d3ee', margin: '0 auto 12px auto' }} />
              <h3 style={{ color: '#ffffff', margin: '0 0 8px 0' }}>Manage Habbits</h3>
              <p style={{ fontSize: '14px' }}>Create and configure your daily habbits list.</p>
            </div>
          )}

        </main>

        {/* BOTTOM NAVIGATION */}
        <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: '#0b0f19', borderTop: '1px solid #1e293b', padding: '10px 0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => setActiveTab('today')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'today' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <Calendar style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Today</span>
          </button>

          <button onClick={() => setActiveTab('weekly')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'weekly' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
            <TrendingUp style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Weekly Report</span>
          </button>

          <button onClick={() => setActiveTab('habbits')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'habbits' ? '#22d3ee' : '#64748b', cursor: 'pointer' }}>
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