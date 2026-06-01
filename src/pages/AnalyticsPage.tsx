import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../components/ui/Card'
import type { TrendPoint, ZoneComparisonRow } from '../types'

interface AnalyticsPageProps {
  trendData: TrendPoint[]
  zoneComparison: ZoneComparisonRow[]
  loading: boolean
}

export function AnalyticsPage({
  trendData,
  zoneComparison,
  loading,
}: AnalyticsPageProps) {
  if (loading && zoneComparison.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <p className="text-sm text-slate-400">Loading zone analytics…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Zone Alert Comparison"
          subtitle="Live warnings & critical readings per zone"
          className="min-h-[360px]"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneComparison} margin={{ left: -8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis
                dataKey="zone"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="incidents"
                name="Alerts"
                fill="#22d3ee"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="congestion"
                name="Avg NO₂ µg/m³"
                fill="#a78bfa"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card
          title="Solar Irradiance Trend"
          subtitle="Real hourly shortwave radiation — Mumbai"
          className="min-h-[360px]"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="energy"
                name="Solar W/m²"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={{ fill: '#fbbf24', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card
        title="Zone Health Matrix"
        subtitle="Live aggregated metrics from Open-Meteo monitoring points"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 pr-4 font-medium">Zone</th>
                <th className="pb-3 pr-4 font-medium">Alerts</th>
                <th className="pb-3 pr-4 font-medium">Avg AQI</th>
                <th className="pb-3 font-medium">Avg NO₂</th>
              </tr>
            </thead>
            <tbody>
              {zoneComparison.map((row) => (
                <tr
                  key={row.zone}
                  className="border-b border-slate-800/80 text-slate-300 last:border-0"
                >
                  <td className="py-3 pr-4 font-medium text-slate-100">
                    {row.zone}
                  </td>
                  <td className="py-3 pr-4">{row.incidents}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={
                        row.avgAqi > 100
                          ? 'text-rose-400'
                          : row.avgAqi > 50
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }
                    >
                      {row.avgAqi || '—'}
                    </span>
                  </td>
                  <td className="py-3">
                    {row.congestion ? `${row.congestion} µg/m³` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
