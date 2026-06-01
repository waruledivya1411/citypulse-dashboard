import { AlertTriangle, Gauge, MapPin, Wifi } from 'lucide-react'
import { Card } from '../ui/Card'

interface KpiCardsProps {
  activeSensors: number
  criticalAlerts: number
  warnings: number
  avgAqi: number
  avgTraffic: number
  uptime: number
}

const items = [
  {
    key: 'sensors',
    label: 'Active Sensors',
    icon: MapPin,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    key: 'critical',
    label: 'Critical Alerts',
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    key: 'aqi',
    label: 'Avg. AQI',
    icon: Gauge,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    key: 'uptime',
    label: 'Network Uptime',
    icon: Wifi,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
] as const

export function KpiCards({
  activeSensors,
  criticalAlerts,
  warnings,
  avgAqi,
  avgTraffic,
  uptime,
}: KpiCardsProps) {
  const values: Record<string, string> = {
    sensors: String(activeSensors),
    critical: String(criticalAlerts),
    aqi: String(avgAqi),
    uptime: `${uptime}%`,
  }

  const subtext: Record<string, string> = {
    sensors: 'Across Mumbai zones',
    critical: `${warnings} warnings pending`,
    aqi: `Avg. NO₂ at junctions: ${avgTraffic} µg/m³`,
    uptime: 'Last 24 hours',
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ key, label, icon: Icon, color, bg }) => (
        <Card key={key} className="!p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {values[key]}
              </p>
              <p className="mt-1 text-xs text-slate-400">{subtext[key]}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
            >
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
