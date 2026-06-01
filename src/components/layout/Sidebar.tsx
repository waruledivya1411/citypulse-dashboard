import {
  Activity,
  BarChart3,
  LayoutDashboard,
  MapPin,
  Radio,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import type { AppView } from '../../types'

const navItems: { id: AppView; label: string; icon: typeof LayoutDashboard }[] =
  [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Map Explorer', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

interface SidebarProps {
  view: AppView
  onNavigate: (view: AppView) => void
}

export function Sidebar({ view, onNavigate }: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-700/60 bg-[#0d1117]">
      <div className="flex items-center gap-3 border-b border-slate-700/60 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 ring-1 ring-cyan-500/40">
          <Radio className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-white">
            CityPulse
          </h1>
          <p className="text-xs text-slate-400">Mumbai, Maharashtra</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              view === id
                ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30'
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-700/60 p-4">
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2.5">
          <Activity className="h-4 w-4 text-emerald-400" />
          <div>
            <p className="text-xs font-medium text-slate-200">System Online</p>
            <p className="text-[10px] text-slate-500">15 sites · Open-Meteo live</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
