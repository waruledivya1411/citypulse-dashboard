import { MapFilters } from '../components/map/MapFilters'
import { CityMap } from '../components/map/CityMap'
import { SensorDetail } from '../components/map/SensorDetail'
import { SensorList } from '../components/map/SensorList'
import { Card } from '../components/ui/Card'
import type { MapFilters as MapFiltersType, Sensor, SensorCategory, SensorStatus } from '../types'

interface MapExplorerPageProps {
  sensors: Sensor[]
  filters: MapFiltersType
  selectedSensor: Sensor | null
  onSelectSensor: (sensor: Sensor) => void
  onClearSelection: () => void
  onToggleCategory: (c: SensorCategory) => void
  onToggleStatus: (s: SensorStatus) => void
  loading?: boolean
}

export function MapExplorerPage({
  sensors,
  filters,
  selectedSensor,
  onSelectSensor,
  onClearSelection,
  onToggleCategory,
  onToggleStatus,
  loading,
}: MapExplorerPageProps) {
  if (loading && sensors.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <p className="text-sm text-slate-400">Loading map sensors for Mumbai…</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-6 lg:grid-cols-[280px_1fr_300px]">
      <div className="space-y-4">
        <MapFilters
          activeCategories={filters.categories}
          activeStatuses={filters.statuses}
          onToggleCategory={onToggleCategory}
          onToggleStatus={onToggleStatus}
          resultCount={sensors.length}
        />
        <Card title="Sensors" subtitle="Click to focus on map">
          <SensorList
            sensors={sensors}
            selectedId={selectedSensor?.id ?? null}
            onSelect={onSelectSensor}
          />
        </Card>
      </div>

      <div className="h-[min(70vh,640px)] overflow-hidden rounded-xl border border-slate-700/60 shadow-xl">
        <CityMap
          sensors={sensors}
          selectedSensor={selectedSensor}
          onSelectSensor={onSelectSensor}
        />
      </div>

      <SensorDetail sensor={selectedSensor} onClose={onClearSelection} />
    </div>
  )
}
