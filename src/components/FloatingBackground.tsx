export function FloatingBackground() {
  const floatingItems = [
    { emoji: '🏋️‍♂️', top: '12%', left: '8%', delay: '0s', duration: '18s' },
    { emoji: '📚', top: '25%', left: '85%', delay: '2s', duration: '22s' },
    { emoji: '🎯', top: '65%', left: '10%', delay: '4s', duration: '20s' },
    { emoji: '💻', top: '80%', left: '78%', delay: '1s', duration: '25s' },
    { emoji: '🥗', top: '45%', left: '90%', delay: '3s', duration: '19s' },
    { emoji: '⏰', top: '88%', left: '30%', delay: '5s', duration: '21s' },
    { emoji: '🧠', top: '15%', left: '50%', delay: '2s', duration: '24s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#07090e]">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />

      {/* Floating Emojis */}
      {floatingItems.map((item, index) => (
        <div
          key={index}
          className="absolute text-2xl select-none opacity-20 hover:opacity-40 transition-opacity animate-bounce"
          style={{
            top: item.top,
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
            filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))'
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}