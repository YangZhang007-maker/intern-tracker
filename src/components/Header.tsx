export default function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💼</span>
          <h1 className="text-lg font-bold text-fg">InternTracker</h1>
        </div>
        <p className="text-xs text-muted hidden sm:block">
          中国实习 & 岗位信息聚合 · 每日更新
        </p>
      </div>
    </header>
  );
}
