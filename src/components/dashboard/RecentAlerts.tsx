import { ArrowRight, Droplets, Gauge, TrafficCone, Zap } from 'lucide-react'
import { categoryLabels, cn } from '../../lib/utils'
import type { Alert, SensorCategory } from '../../types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

const categoryIcons: Record<SensorCategory, typeof Gauge> = {
  air_quality: Gauge,
  traffic: TrafficCone,
  flood: Droplets,
  energy: Zap,
}

interface RecentAlertsProps {
  alerts: Alert[]
  onViewOnMap?: (zone: string) => void
}

export function RecentAlerts({ alerts, onViewOnMap }: RecentAlertsProps) {
  return (
    <Card title="Recent Alerts" subtitle="Last 24 hours" className="h-full">
      <ul className="space-y-3">
        {alerts.map((alert) => {
          const Icon = categoryIcons[alert.category]
          return (
            <li
              key={alert.id}
              className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 transition hover:border-slate-600"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700/50">
                <Icon className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-slate-100">
                    {alert.title}
                  </p>
                  <Badge status={alert.severity}>{alert.severity}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">
                  {alert.zone} · {categoryLabels[alert.category]} ·{' '}
                  {alert.timestamp}
                </p>
              </div>
              {onViewOnMap && (
                <button
                  type="button"
                  onClick={() => onViewOnMap(alert.zone)}
                  className={cn(
                    'shrink-0 rounded-md p-1.5 text-slate-500 transition',
                    'hover:bg-slate-700 hover:text-cyan-400',
                  )}
                  aria-label="View on map"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
