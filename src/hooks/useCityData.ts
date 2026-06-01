import { useCallback, useEffect, useMemo, useState } from 'react'
import { filterSensors } from '../lib/utils'
import { fetchLiveMumbaiData } from '../services/openMeteo'
import type {
  Alert,
  AppView,
  MapFilters,
  Sensor,
  SensorCategory,
  SensorStatus,
  TrendPoint,
  ZoneComparisonRow,
} from '../types'

const defaultFilters: MapFilters = {
  categories: ['air_quality', 'traffic', 'flood', 'energy'],
  statuses: ['healthy', 'warning', 'critical'],
  search: '',
}

const emptyStats = [
  { name: 'Air Quality', value: 0, fill: '#22d3ee' },
  { name: 'Traffic (NO₂)', value: 0, fill: '#a78bfa' },
  { name: 'Rainfall / Flood', value: 0, fill: '#34d399' },
  { name: 'Solar / Energy', value: 0, fill: '#fbbf24' },
]

export function useCityData() {
  const [view, setView] = useState<AppView>('overview')
  const [filters, setFilters] = useState<MapFilters>(defaultFilters)
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null)

  const [sensors, setSensors] = useState<Sensor[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [trendData, setTrendData] = useState<TrendPoint[]>([])
  const [zoneComparison, setZoneComparison] = useState<ZoneComparisonRow[]>([])
  const [categoryStats, setCategoryStats] = useState(emptyStats)
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLiveMumbaiData()
      setSensors(data.sensors)
      setAlerts(data.alerts)
      setTrendData(data.trendData)
      setZoneComparison(data.zoneComparison)
      setCategoryStats(data.categoryStats)
      setFetchedAt(data.fetchedAt)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load live data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [loadData])

  const filteredSensors = useMemo(
    () =>
      filterSensors(
        sensors,
        filters.categories,
        filters.statuses,
        filters.search,
      ),
    [sensors, filters],
  )

  const selectedSensor = useMemo(
    () => sensors.find((s) => s.id === selectedSensorId) ?? null,
    [sensors, selectedSensorId],
  )

  const kpis = useMemo(() => {
    const critical = sensors.filter((s) => s.status === 'critical').length
    const warning = sensors.filter((s) => s.status === 'warning').length
    const aqiList = sensors.filter((s) => s.category === 'air_quality')
    const trafficList = sensors.filter((s) => s.category === 'traffic')
    const avgAqi =
      aqiList.length > 0
        ? Math.round(aqiList.reduce((sum, s) => sum + s.value, 0) / aqiList.length)
        : 0
    const avgNo2 =
      trafficList.length > 0
        ? Math.round(
            trafficList.reduce((sum, s) => sum + s.value, 0) / trafficList.length,
          )
        : 0
    return {
      activeSensors: sensors.length,
      criticalAlerts: critical,
      warnings: warning,
      avgAqi,
      avgTraffic: avgNo2,
      uptime: 100,
    }
  }, [sensors])

  const toggleCategory = (category: SensorCategory) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category)
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      }
    })
  }

  const toggleStatus = (status: SensorStatus) => {
    setFilters((prev) => {
      const exists = prev.statuses.includes(status)
      return {
        ...prev,
        statuses: exists
          ? prev.statuses.filter((s) => s !== status)
          : [...prev.statuses, status],
      }
    })
  }

  const selectSensor = (sensor: Sensor | null) => {
    setSelectedSensorId(sensor?.id ?? null)
  }

  const focusSensorOnMap = (sensorId: string) => {
    setSelectedSensorId(sensorId)
    setView('map')
  }

  return {
    view,
    setView,
    filters,
    setFilters,
    filteredSensors,
    selectedSensor,
    selectSensor,
    focusSensorOnMap,
    toggleCategory,
    toggleStatus,
    kpis,
    alerts,
    trendData,
    zoneComparison,
    categoryStats,
    allSensors: sensors,
    loading,
    error,
    fetchedAt,
    refresh: loadData,
  }
}
