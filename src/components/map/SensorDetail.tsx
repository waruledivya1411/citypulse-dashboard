import { MapPin, X } from 'lucide-react'
import { categoryLabels } from '../../lib/utils'
import type { Sensor } from '../../types'
import { Badge } from '../ui/Badge'

interface SensorDetailProps {
  sensor: Sensor | null
  onClose: () => void
  onViewMap?: () => void
}

export function SensorDetail({ sensor, onClose }: SensorDetailProps) {
  if (!sensor) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#161b22] p-6 text-center">
        <MapPin className="h-8 w-8 text-slate-600" />
        <p className="mt-3 text-sm text-slate-400">
          Select a sensor on the map or list to view details
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-700/60 bg-[#161b22] p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white">{sensor.name}</h3>
          <p className="text-xs text-slate-400">{sensor.zone}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-cyan-400">{sensor.value}</span>
        <span className="text-sm text-slate-400">{sensor.unit}</span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Category</dt>
          <dd className="text-slate-200">{categoryLabels[sensor.category]}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Status</dt>
          <dd>
            <Badge status={sensor.status}>{sensor.status}</Badge>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Coordinates</dt>
          <dd className="font-mono text-xs text-slate-300">
            {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Last updated</dt>
          <dd className="text-slate-300">{sensor.lastUpdated}</dd>
        </div>
        {sensor.source && (
          <div className="flex justify-between">
            <dt className="text-slate-500">Data source</dt>
            <dd className="text-slate-300">{sensor.source}</dd>
          </div>
        )}
      </dl>
      {sensor.detail && (
        <p className="mt-3 rounded-lg bg-slate-800/50 p-2 text-xs text-slate-400">
          {sensor.detail}
        </p>
      )}
    </div>
  )
}
