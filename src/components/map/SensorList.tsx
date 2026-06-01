import { cn, statusColors } from '../../lib/utils'
import type { Sensor } from '../../types'

interface SensorListProps {
  sensors: Sensor[]
  selectedId: string | null
  onSelect: (sensor: Sensor) => void
}

export function SensorList({ sensors, selectedId, onSelect }: SensorListProps) {
  return (
    <ul className="max-h-64 space-y-1 overflow-y-auto lg:max-h-[calc(100vh-22rem)]">
      {sensors.map((sensor) => (
        <li key={sensor.id}>
          <button
            type="button"
            onClick={() => onSelect(sensor)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition',
              selectedId === sensor.id
                ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30'
                : 'hover:bg-slate-800/80',
            )}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: statusColors[sensor.status] }}
            />
            <span className="min-w-0 flex-1 truncate text-slate-200">
              {sensor.name}
            </span>
            <span className="shrink-0 text-xs text-slate-500">
              {sensor.value} {sensor.unit}
            </span>
          </button>
        </li>
      ))}
      {sensors.length === 0 && (
        <li className="py-6 text-center text-sm text-slate-500">
          No sensors match filters
        </li>
      )}
    </ul>
  )
}
