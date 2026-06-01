import { categoryLabels, cn } from '../../lib/utils'
import type { SensorCategory, SensorStatus } from '../../types'

const categories: SensorCategory[] = [
  'air_quality',
  'traffic',
  'flood',
  'energy',
]
const statuses: SensorStatus[] = ['healthy', 'warning', 'critical']

const statusStyles: Record<SensorStatus, string> = {
  healthy: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  critical: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
}

interface MapFiltersProps {
  activeCategories: SensorCategory[]
  activeStatuses: SensorStatus[]
  onToggleCategory: (c: SensorCategory) => void
  onToggleStatus: (s: SensorStatus) => void
  resultCount: number
}

export function MapFilters({
  activeCategories,
  activeStatuses,
  onToggleCategory,
  onToggleStatus,
  resultCount,
}: MapFiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-700/60 bg-[#161b22] p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Layers
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = activeCategories.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onToggleCategory(cat)}
                className={cn(
                  'rounded-lg border px-2.5 py-1 text-xs font-medium transition',
                  active
                    ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-500 line-through',
                )}
              >
                {categoryLabels[cat]}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Status
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {statuses.map((status) => {
            const active = activeStatuses.includes(status)
            return (
              <button
                key={status}
                type="button"
                onClick={() => onToggleStatus(status)}
                className={cn(
                  'rounded-lg border px-2.5 py-1 text-xs font-medium capitalize transition',
                  active ? statusStyles[status] : 'border-slate-700 text-slate-600',
                )}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-cyan-400">{resultCount}</span>{' '}
        sensors on map
      </p>
    </div>
  )
}
