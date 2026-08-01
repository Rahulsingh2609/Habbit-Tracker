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
  LogOut
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'habbits' | 'streaks' | 'profile'>('today');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Habbits');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State for Adding Habits
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('ROUTINE');
  const [newHabitSubtext, setNewHabitSubtext] = useState('');

  const [habbits, setHabbits] = useState<Habbit[]>([
    { id: '1', name: 'Early Wakeup', category: 'ROUTINE', subtext: '6:00 AM', streak: 3, completed: false, icon: <Sun style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #9333ea, #6366f1)' },
    { id: '2', name: 'Running', category: 'FITNESS', subtext: '5 km run', streak: 5, completed: true, icon: <Activity style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '3', name: 'Healthy Breakfast', category: 'HEALTH', subtext: 'High protein', streak: 2, completed: false, icon: <Apple style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '4', name: 'College Prep', category: 'LEARNING', subtext: 'Lectures & notes', streak: 12, completed: false, icon: <GraduationCap style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '5', name: 'Gym Training', category: 'FITNESS', subtext: 'Heavy lifting', streak: 4, completed: false, icon: <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #ea580c, #f59e0b)' },
    { id: '6', name: 'Clean Diet', category: 'HEALTH', subtext: 'Zero junk food', streak: 8, completed: true, icon: <Utensils style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #059669, #2dd4bf)' },
    { id: '7', name: 'DSA & Coding', category: 'LEARNING', subtext: 'LeetCode practice', streak: 15, completed: false, icon: <Code style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
    { id: '8', name: 'Web Dev Project', category: 'LEARNING', subtext: 'Build features', streak: 9, completed: false, icon: <Laptop style={{ width: 20, height: 20, color: 'white' }} />, iconBg: 'linear-gradient(135deg, #2563eb, #22d3ee)' },
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

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    let icon = <Activity style={{ width: 20, height: 20, color: 'white' }} />;
    let iconBg = 'linear-gradient(135deg, #9333ea, #6366f1)';

    if (newHabitCategory === 'FITNESS') {
      icon = <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #ea580c, #f59e0b)';
    } else if (newHabitCategory === 'HEALTH') {
      icon = <Apple style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #059669, #2dd4bf)';
    } else if (newHabitCategory === 'LEARNING') {
      icon = <Code style={{ width: 20, height: 20, color: 'white' }} />;
      iconBg = 'linear-gradient(135deg, #2563eb, #22d3ee)';
    }

    const newHabitObj: Habbit = {
      id: Date.now().toString(),
      name: newHabitName,
      category: newHabitCategory,
      subtext: newHabitSubtext || 'Daily Target',
      streak: 1,
      completed: false,
      icon,
      iconBg
    };

    setHabbits([...habbits, newHabitObj]);
    setNewHabitName('');
    setNewHabitSubtext('');
    setIsAddModalOpen(false);
  };

  const completedCount = habbits.filter(h => h.completed).length;
  const progressPercentage = Math.round((completedCount / habbits.length) * 100) || 0;

  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#070b12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <LogOut style={{ width: 48, height: 48, color: '#f43f5e', margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Logged Out</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px 0' }}>You have successfully signed out of Habit Tracker.</p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            style={{ width: '100%', backgroundColor: '#06b6d4', color: '#000000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Log Back In
          </button>
        </div>
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

        {/* MAIN CONTENT AREA */}
        <main style={{ flex: 1, padding: '20px 16px 100px 16px', overflowY: 'auto' }}>
          
          {/* TAB 1: TODAY */}
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

              {/* HABBIT LIST */}
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

          {/* TAB 2: WEEKLY */}
          {activeTab === 'weekly' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#ffffff' }}>Weekly Completion Rate</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 0' }}>
                  {[
                    { day: 'Mon', val: 70 },
                    { day: 'Tue', val: 85 },
                    { day: 'Wed', val: 60 },
                    { day: 'Thu', val: 90 },
                    { day: 'Fri', val: 50 },
                    { day: 'Sat', val: progressPercentage },
                    { day: 'Sun', val: 0 },
                  ].map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ width: '28px', backgroundColor: d.day === 'Sat' ? '#06b6d4' : '#1e293b', height: `${d.val}%`, borderRadius: '6px', transition: 'height 0.3s' }}></div>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HABBITS (MANAGE & ADD) */}
          {activeTab === 'habbits' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                style={{ width: '100%', padding: '14px', backgroundColor: '#06b6d4', color: '#000000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <PlusCircle style={{ width: 18, height: 18 }} />
                <span>Add New Habit</span>
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                {habbits.map((h) => (
                  <div key={h.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{h.name}</span>
                    <button 
                      onClick={() => setHabbits(habbits.filter(item => item.id !== h.id))}
                      style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STREAKS */}
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

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#06b6d4', borderRadius: '50%', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>
                  U
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Active User</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>user@habit-tracker.com</p>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', border: 'none', color: '#f43f5e', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <LogOut style={{ width: 18, height: 18 }} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}

        </main>

        {/* ADD HABIT MODAL POPUP */}
        {isAddModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '24px', position: 'relative' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
              
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Create New Habit</h2>
              
              <form onSubmit={handleAddHabit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Habit Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Morning Meditation" 
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Category</label>
                  <select 
                    value={newHabitCategory}
                    onChange={(e) => setNewHabitCategory(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }}
                  >
                    <option value="ROUTINE">Routine</option>
                    <option value="FITNESS">Fitness</option>
                    <option value="HEALTH">Health</option>
                    <option value="LEARNING">Learning</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Subtext / Goal</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 10 minutes daily" 
                    value={newHabitSubtext}
                    onChange={(e) => setNewHabitSubtext(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#070b12', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', boxSizing: 'border-box' }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', backgroundColor: '#06b6d4', color: '#000000', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
                >
                  Save Habit
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