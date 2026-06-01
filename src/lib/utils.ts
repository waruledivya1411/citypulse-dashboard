import { clsx, type ClassValue } from 'clsx'
import type { SensorCategory, SensorStatus } from '../types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const categoryLabels: Record<SensorCategory, string> = {
  air_quality: 'Air Quality (AQI)',
  traffic: 'Traffic Emissions (NO₂)',
  flood: 'Rainfall / Flood Risk',
  energy: 'Solar Irradiance',
}

export const statusColors: Record<SensorStatus, string> = {
  healthy: '#34d399',
  warning: '#fbbf24',
  critical: '#f87171',
}

export function filterSensors<
  T extends {
    name: string
    category: SensorCategory
    status: SensorStatus
    zone: string
  },
>(
  items: T[],
  categories: SensorCategory[],
  statuses: SensorStatus[],
  search: string,
): T[] {
  const q = search.trim().toLowerCase()
  return items.filter((item) => {
    if (!categories.includes(item.category)) return false
    if (!statuses.includes(item.status)) return false
    if (
      q &&
      !item.name.toLowerCase().includes(q) &&
      !item.zone.toLowerCase().includes(q)
    ) {
      return false
    }
    return true
  })
}
