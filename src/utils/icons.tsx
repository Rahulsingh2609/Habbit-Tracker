import * as LucideIcons from 'lucide-react';
import { Sparkles } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

/**
 * Resolves a Habit's `icon` field (a Lucide icon name like "Dumbbell", or a
 * raw emoji like "🔥") into something renderable.
 *
 * Previously habit.icon (a string) was being rendered directly as text,
 * which showed the literal word "Dumbbell" instead of an icon. This fixes
 * that by looking the name up in lucide-react's icon set at runtime.
 */
export function HabitIcon({ name, ...props }: { name?: string } & LucideProps) {
  if (!name) return <Sparkles {...props} />;

  // Emoji or any other non-alphanumeric icon value: just render it as text.
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return <span style={{ fontSize: props.size ? `${Number(props.size) * 0.85}px` : '1.1rem' }}>{name}</span>;
  }

  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  const Fallback = Sparkles;
  const Resolved = Icon || Fallback;
  return <Resolved {...props} />;
}

/** Category -> gradient + glow theme, used for icon badges across the app. */
export function getCategoryTheme(category?: string) {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'fitness':
      return { gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.35)', text: 'text-amber-300' };
    case 'health':
      return { gradient: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.35)', text: 'text-emerald-300' };
    case 'learning':
      return { gradient: 'from-cyan-500 to-blue-600', glow: 'rgba(6,182,212,0.35)', text: 'text-cyan-300' };
    case 'routine':
      return { gradient: 'from-purple-500 to-indigo-600', glow: 'rgba(168,85,247,0.35)', text: 'text-purple-300' };
    case 'lifestyle':
      return { gradient: 'from-pink-500 to-rose-600', glow: 'rgba(244,63,94,0.35)', text: 'text-rose-300' };
    default:
      return { gradient: 'from-slate-500 to-slate-700', glow: 'rgba(148,163,184,0.25)', text: 'text-slate-300' };
  }
}