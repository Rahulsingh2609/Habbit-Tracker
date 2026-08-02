import type { Habit, HabitLog, WeeklyReportData, HabitWeeklySummary, DayOfWeekStatus, UserStats } from '../types/habit';
import { DEFAULT_HABITS } from '../data/defaultHabits';

const STORAGE_KEYS = {
  HABITS: 'habbit_tracker_habits_v1',
  LOGS: 'habbit_tracker_logs_v1',
  STATS: 'habbit_tracker_stats_v1',
};

// Format date as YYYY-MM-DD
export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getTodayString(): string {
  return formatDate(new Date());
}

// Get Monday of the week for a given date
export function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Get array of 7 dates (Mon-Sun) starting from Monday
export function getWeekDays(monday: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    days.push(nextDay);
  }
  return days;
}

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(DEFAULT_HABITS));
      return DEFAULT_HABITS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load habits from localStorage', e);
    return DEFAULT_HABITS;
  }
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
}

// Loads real user logs or starts completely empty
export function loadLogs(): Record<string, HabitLog> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify({}));
      return {};
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load habit logs', e);
    return {};
  }
}

export function saveLogs(logs: Record<string, HabitLog>): void {
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

export function getTodayLog(logs: Record<string, HabitLog>, dateStr: string = getTodayString()): HabitLog {
  return logs[dateStr] || {
    date: dateStr,
    completedHabitIds: [],
    habitMetrics: {},
    habitNotes: {},
  };
}

export function toggleHabitCompletion(
  logs: Record<string, HabitLog>,
  dateStr: string,
  habitId: string,
  metricValue?: number
): { updatedLogs: Record<string, HabitLog>; isCompletedNow: boolean } {
  const currentLog = getTodayLog(logs, dateStr);
  const exists = currentLog.completedHabitIds.includes(habitId);

  let newCompletedIds: string[];
  if (exists) {
    newCompletedIds = currentLog.completedHabitIds.filter((id) => id !== habitId);
  } else {
    newCompletedIds = [...currentLog.completedHabitIds, habitId];
  }

  const updatedMetrics = { ...currentLog.habitMetrics };
  if (metricValue !== undefined) {
    updatedMetrics[habitId] = metricValue;
  }

  const updatedLogs = {
    ...logs,
    [dateStr]: {
      ...currentLog,
      completedHabitIds: newCompletedIds,
      habitMetrics: updatedMetrics,
    },
  };

  saveLogs(updatedLogs);
  return { updatedLogs, isCompletedNow: !exists };
}

export function calculateWeeklyReport(
  habits: Habit[],
  logs: Record<string, HabitLog>,
  weekOffset: number = 0
): WeeklyReportData {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weekOffset * 7);
  const monday = getMonday(targetDate);
  const weekDays = getWeekDays(monday);

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let totalLogged = 0;
  let totalPossible = 0;

  const dayCompletions: Record<string, number> = {};

  const habitSummaries: HabitWeeklySummary[] = habits.map((habit) => {
    let completedCount = 0;

    const days: DayOfWeekStatus[] = weekDays.map((d, index) => {
      const dateStr = formatDate(d);
      const log = logs[dateStr];
      const completed = log ? log.completedHabitIds.includes(habit.id) : false;

      if (completed) {
        completedCount++;
        totalLogged++;
        dayCompletions[dateStr] = (dayCompletions[dateStr] || 0) + 1;
      }
      totalPossible++;

      return {
        dayName: dayNames[index],
        dateStr,
        completed,
        metricValue: log?.habitMetrics?.[habit.id],
      };
    });

    const percentage = Math.round((completedCount / 7) * 100);

    return {
      habit,
      days,
      completedCount,
      totalDays: 7,
      percentage,
    };
  });

  const overallPercentage = totalPossible > 0 ? Math.round((totalLogged / totalPossible) * 100) : 0;

  let maxDayDate = formatDate(weekDays[0]);
  let maxDayCount = -1;
  weekDays.forEach((d) => {
    const ds = formatDate(d);
    const count = dayCompletions[ds] || 0;
    if (count > maxDayCount) {
      maxDayCount = count;
      maxDayDate = ds;
    }
  });

  const bestDayObj = new Date(maxDayDate + 'T00:00:00');
  const bestDayFormatted = bestDayObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const sortedHabits = [...habitSummaries].sort((a, b) => b.percentage - a.percentage);
  const topHabits = sortedHabits.slice(0, 3).map((s) => `${s.habit.name} (${s.percentage}%)`);

  const startStr = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const weekLabel = `${startStr} - ${endStr}`;

  return {
    weekLabel,
    startDateStr: formatDate(weekDays[0]),
    endDateStr: formatDate(weekDays[6]),
    overallCompletionPercentage: overallPercentage,
    totalHabitsLogged: totalLogged,
    totalPossibleHabits: totalPossible,
    bestDay: bestDayFormatted,
    topHabits,
    habitSummaries,
  };
}

export function calculateUserStats(logs: Record<string, HabitLog>, habits: Habit[]): UserStats {
  let totalCompletions = 0;
  Object.values(logs).forEach((log) => {
    totalCompletions += log.completedHabitIds.length;
  });

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = formatDate(d);
    const log = logs[ds];

    const minTarget = Math.ceil(habits.length * 0.5);
    const count = log?.completedHabitIds.length || 0;

    if (count >= minTarget && habits.length > 0) {
      tempStreak++;
      if (i === 0 || i === 1) {
        currentStreak = tempStreak;
      }
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
      }
    } else {
      if (i === 0) {
        continue;
      }
      tempStreak = 0;
    }
  }

  const xp = totalCompletions * 25 + currentStreak * 50;
  const level = Math.floor(xp / 250) + 1;

  return {
    xp,
    level,
    currentStreak,
    bestStreak,
    totalCompletions,
  };
}