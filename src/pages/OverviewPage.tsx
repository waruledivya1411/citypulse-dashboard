import { CategoryBreakdown } from '../components/dashboard/CategoryBreakdown'
import { KpiCards } from '../components/dashboard/KpiCards'
import { RecentAlerts } from '../components/dashboard/RecentAlerts'
import { TrendChart } from '../components/dashboard/TrendChart'
import type { Alert, TrendPoint } from '../types'

interface OverviewPageProps {
  kpis: {
    activeSensors: number
    criticalAlerts: number
    warnings: number
    avgAqi: number
    avgTraffic: number
    uptime: number
  }
  alerts: Alert[]
  trendData: TrendPoint[]
  categoryStats: { name: string; value: number; fill: string }[]
  loading: boolean
  onNavigateToMap: () => void
}

export function OverviewPage({
  kpis,
  alerts,
  trendData,
  categoryStats,
  loading,
  onNavigateToMap,
}: OverviewPageProps) {
  if (loading && kpis.activeSensors === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <p className="text-sm text-slate-400">Loading live Mumbai data from Open-Meteo…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <KpiCards {...kpis} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrendChart data={trendData} />
        </div>
        <CategoryBreakdown data={categoryStats} />
      </div>
      <RecentAlerts alerts={alerts} onViewOnMap={() => onNavigateToMap()} />
    </div>
  )
}
