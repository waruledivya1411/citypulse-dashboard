export type SensorCategory = 'air_quality' | 'traffic' | 'flood' | 'energy'
export type SensorStatus = 'healthy' | 'warning' | 'critical'

export interface Sensor {
  id: string
  name: string
  category: SensorCategory
  status: SensorStatus
  lat: number
  lng: number
  value: number
  unit: string
  zone: string
  lastUpdated: string
  source?: string
  detail?: string
}

export interface ZoneComparisonRow {
  zone: string
  incidents: number
  avgAqi: number
  congestion: number
}

export interface Alert {
  id: string
  title: string
  zone: string
  severity: SensorStatus
  timestamp: string
  category: SensorCategory
}

export interface TrendPoint {
  time: string
  aqi: number
  traffic: number
  energy: number
}

export type AppView = 'overview' | 'map' | 'analytics'

export interface MapFilters {
  categories: SensorCategory[]
  statuses: SensorStatus[]
  search: string
}
