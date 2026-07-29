export type HabitCategory = 'health' | 'fitness' | 'learning' | 'routine' | 'lifestyle';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  icon: string; // Lucide icon name or emoji
  targetDescription: string; // e.g. "6:00 AM", "5 km", "1 hr", "8 hrs"
  unit?: string; // e.g., "km", "mins", "hrs", "pages"
  targetValue?: number; // e.g. 5 for 5km
  color: string; // accent color hex or gradient
  isCustom?: boolean;
}

export interface HabitLog {
  date: string; // YYYY-MM-DD
  completedHabitIds: string[]; // List of completed habit IDs
  habitMetrics?: Record<string, number>; // habitId -> value logged (e.g. 5km)
  habitNotes?: Record<string, string>; // habitId -> note
}

export interface DayOfWeekStatus {
  dayName: string; // 'Mon', 'Tue', etc.
  dateStr: string; // YYYY-MM-DD
  completed: boolean;
  metricValue?: number;
}

export interface HabitWeeklySummary {
  habit: Habit;
  days: DayOfWeekStatus[];
  completedCount: number;
  totalDays: number;
  percentage: number;
}

export interface WeeklyReportData {
  weekLabel: string; // e.g. "Jul 21 - Jul 27, 2026"
  startDateStr: string; // YYYY-MM-DD
  endDateStr: string; // YYYY-MM-DD
  overallCompletionPercentage: number;
  totalHabitsLogged: number;
  totalPossibleHabits: number;
  bestDay: string;
  topHabits: string[];
  habitSummaries: HabitWeeklySummary[];
}

export interface UserStats {
  xp: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
}
