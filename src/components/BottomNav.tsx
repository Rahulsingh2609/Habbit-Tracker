import { Calendar, BarChart2, PlusCircle, Award } from 'lucide-react';

export type NavTab = 'today' | 'weekly' | 'manage' | 'profile';

interface Props {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  todayCompletionRate: number;
}

export function BottomNav({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: 'today' as NavTab, label: 'Today', icon: Calendar },
    { id: 'weekly' as NavTab, label: 'Weekly Report', icon: BarChart2 },
    { id: 'manage' as NavTab, label: 'Habits', icon: PlusCircle },
    { id: 'profile' as NavTab, label: 'Streaks', icon: Award },
  ];

  return (
    <div className="bg-[#0b0f19]/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-2 px-3 shadow-2xl flex items-center justify-around shadow-cyan-950/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              isActive
                ? "text-cyan-400 bg-cyan-500/10 px-3.5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}