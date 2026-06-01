import { Bell, Search } from 'lucide-react'
import type { AppView } from '../../types'

const titles: Record<AppView, { title: string; subtitle: string }> = {
  overview: {
    title: 'City Overview',
    subtitle: 'Real-time environmental and mobility metrics',
  },
  map: {
    title: 'Geospatial Explorer',
    subtitle: 'Interactive sensor map with layer filtering',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Zone comparisons and historical trends',
  },
}

interface HeaderProps {
  view: AppView
  search: string
  onSearchChange: (value: string) => void
  alertCount: number
}

export function Header({
  view,
  search,
  onSearchChange,
  alertCount,
}: HeaderProps) {
  const { title, subtitle } = titles[view]

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 bg-[#0d1117]/80 px-6 py-4 backdrop-blur-sm">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search sensors or zones..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 rounded-lg border border-slate-700 bg-slate-800/80 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:bg-slate-700"
          aria-label={`${alertCount} alerts`}
        >
          <Bell className="h-4 w-4" />
          {alertCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {alertCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
