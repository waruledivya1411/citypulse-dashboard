import { CITY_CENTER, MUMBAI_SITES } from '../config/mumbaiSites'
import type {
  Alert,
  Sensor,
  SensorCategory,
  SensorStatus,
  TrendPoint,
} from '../types'
import type { MumbaiSite } from '../config/mumbaiSites'

const AIR_API = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'
const TZ = 'Asia/Kolkata'

interface AirQualityLocation {
  latitude: number
  longitude: number
  current?: {
    time: string
    us_aqi?: number
    pm2_5?: number
    pm10?: number
    nitrogen_dioxide?: number
  }
  hourly?: {
    time: string[]
    us_aqi?: number[]
    nitrogen_dioxide?: number[]
  }
}

interface WeatherLocation {
  latitude: number
  longitude: number
  current?: {
    time: string
    precipitation?: number
    rain?: number
    shortwave_radiation?: number
    temperature_2m?: number
    wind_speed_10m?: number
  }
  hourly?: {
    time: string[]
    us_aqi?: number[]
    nitrogen_dioxide?: number[]
    precipitation?: number[]
    shortwave_radiation?: number[]
  }
}

export interface LiveCityPayload {
  sensors: Sensor[]
  alerts: Alert[]
  trendData: TrendPoint[]
  zoneComparison: {
    zone: string
    incidents: number
    avgAqi: number
    congestion: number
  }[]
  categoryStats: { name: string; value: number; fill: string }[]
  fetchedAt: string
}

function coordsParam(sites: MumbaiSite[]) {
  return {
    latitude: sites.map((s) => s.lat).join(','),
    longitude: sites.map((s) => s.lng).join(','),
  }
}

function aqiStatus(aqi: number): SensorStatus {
  if (aqi <= 50) return 'healthy'
  if (aqi <= 100) return 'warning'
  return 'critical'
}

function no2Status(no2: number): SensorStatus {
  if (no2 <= 40) return 'healthy'
  if (no2 <= 80) return 'warning'
  return 'critical'
}

function rainStatus(mm: number): SensorStatus {
  if (mm <= 0) return 'healthy'
  if (mm <= 2.5) return 'warning'
  return 'critical'
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    })
  } catch {
    return iso
  }
}

function buildSensor(
  site: MumbaiSite,
  air?: AirQualityLocation,
  weather?: WeatherLocation,
): Sensor | null {
  const updated = air?.current?.time ?? weather?.current?.time ?? new Date().toISOString()

  switch (site.category) {
    case 'air_quality': {
      const aqi = air?.current?.us_aqi
      if (aqi == null) return null
      return {
        id: site.id,
        name: site.name,
        zone: site.zone,
        lat: site.lat,
        lng: site.lng,
        category: site.category,
        value: Math.round(aqi),
        unit: 'US AQI',
        status: aqiStatus(aqi),
        lastUpdated: formatTime(updated),
        source: 'Open-Meteo CAMS',
        detail: air?.current?.pm2_5 != null ? `PM2.5: ${air.current.pm2_5} µg/m³` : undefined,
      }
    }
    case 'traffic': {
      const no2 = air?.current?.nitrogen_dioxide
      if (no2 == null) return null
      return {
        id: site.id,
        name: site.name,
        zone: site.zone,
        lat: site.lat,
        lng: site.lng,
        category: site.category,
        value: Math.round(no2 * 10) / 10,
        unit: 'µg/m³ NO₂',
        status: no2Status(no2),
        lastUpdated: formatTime(updated),
        source: 'Open-Meteo CAMS',
        detail: 'NO₂ indicates vehicle emissions near junctions',
      }
    }
    case 'flood': {
      const mm = weather?.current?.precipitation ?? weather?.current?.rain
      if (mm == null) return null
      return {
        id: site.id,
        name: site.name,
        zone: site.zone,
        lat: site.lat,
        lng: site.lng,
        category: site.category,
        value: Math.round(mm * 100) / 100,
        unit: 'mm rain',
        status: rainStatus(mm),
        lastUpdated: formatTime(updated),
        source: 'Open-Meteo Weather',
        detail: 'Live precipitation for flood-risk zones',
      }
    }
    case 'energy': {
      const solar = weather?.current?.shortwave_radiation
      if (solar == null) return null
      const temp = weather?.current?.temperature_2m
      return {
        id: site.id,
        name: site.name,
        zone: site.zone,
        lat: site.lat,
        lng: site.lng,
        category: site.category,
        value: Math.round(solar),
        unit: 'W/m² solar',
        status: solar >= 200 ? 'healthy' : solar >= 50 ? 'warning' : 'healthy',
        lastUpdated: formatTime(updated),
        source: 'Open-Meteo Weather',
        detail: temp != null ? `Air temp: ${temp}°C` : undefined,
      }
    }
    default:
      return null
  }
}

function buildAlerts(sensors: Sensor[]): Alert[] {
  return sensors
    .filter((s) => s.status !== 'healthy')
    .sort((a) => (a.status === 'critical' ? -1 : 1))
    .slice(0, 6)
    .map((s, i) => ({
      id: `alert-${i}`,
      title:
        s.category === 'air_quality'
          ? `Unhealthy air: AQI ${s.value}`
          : s.category === 'traffic'
            ? `High traffic emissions (NO₂)`
            : s.category === 'flood'
              ? `Rainfall alert: ${s.value} mm`
              : `Low solar irradiance`,
      zone: s.zone,
      severity: s.status,
      timestamp: s.lastUpdated,
      category: s.category,
    }))
}

function buildTrend(
  airHourly?: AirQualityLocation['hourly'],
  weatherHourly?: WeatherLocation['hourly'],
): TrendPoint[] {
  // Sample every 3 hours for readable chart
  const times = airHourly?.time ?? weatherHourly?.time ?? []
  const points: TrendPoint[] = []

  for (let i = 0; i < times.length; i++) {
    const t = times[i]
    if (!t) continue
    const hour = new Date(t).toLocaleTimeString('en-IN', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
    })
    const aqi = airHourly?.us_aqi?.[i]
    const no2 = airHourly?.nitrogen_dioxide?.[i]
    const solar = weatherHourly?.shortwave_radiation?.[i]
    if (aqi == null && no2 == null && solar == null) continue
    points.push({
      time: hour,
      aqi: aqi ?? 0,
      traffic: no2 ?? 0,
      energy: solar ?? 0,
    })
  }

  return points.filter((_, i) => i % 3 === 0).slice(-12)
}

function buildZoneComparison(sensors: Sensor[]) {
  const zones = [...new Set(sensors.map((s) => s.zone))]
  return zones.map((zone) => {
    const inZone = sensors.filter((s) => s.zone === zone)
    const aqiSensors = inZone.filter((s) => s.category === 'air_quality')
    const trafficSensors = inZone.filter((s) => s.category === 'traffic')
    const incidents = inZone.filter((s) => s.status !== 'healthy').length
    const avgAqi =
      aqiSensors.length > 0
        ? Math.round(
            aqiSensors.reduce((s, x) => s + x.value, 0) / aqiSensors.length,
          )
        : 0
    const congestion =
      trafficSensors.length > 0
        ? Math.round(
            trafficSensors.reduce((s, x) => s + x.value, 0) /
              trafficSensors.length,
          )
        : 0
    return { zone, incidents, avgAqi, congestion }
  })
}

const CATEGORY_COLORS: Record<SensorCategory, { name: string; fill: string }> = {
  air_quality: { name: 'Air Quality', fill: '#22d3ee' },
  traffic: { name: 'Traffic (NO₂)', fill: '#a78bfa' },
  flood: { name: 'Rainfall / Flood', fill: '#34d399' },
  energy: { name: 'Solar / Energy', fill: '#fbbf24' },
}

export async function fetchLiveMumbaiData(): Promise<LiveCityPayload> {
  const sites = MUMBAI_SITES
  const { latitude, longitude } = coordsParam(sites)

  const [airRes, weatherRes, airTrendRes, weatherTrendRes] = await Promise.all([
    fetch(
      `${AIR_API}?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm2_5,pm10,nitrogen_dioxide&timezone=${encodeURIComponent(TZ)}`,
    ),
    fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=precipitation,rain,shortwave_radiation,temperature_2m,wind_speed_10m&timezone=${encodeURIComponent(TZ)}`,
    ),
    fetch(
      `${AIR_API}?latitude=${CITY_CENTER.lat}&longitude=${CITY_CENTER.lng}&hourly=us_aqi,nitrogen_dioxide&past_days=1&timezone=${encodeURIComponent(TZ)}`,
    ),
    fetch(
      `${WEATHER_API}?latitude=${CITY_CENTER.lat}&longitude=${CITY_CENTER.lng}&hourly=shortwave_radiation,precipitation&past_days=1&timezone=${encodeURIComponent(TZ)}`,
    ),
  ])

  if (!airRes.ok) throw new Error(`Air quality API error: ${airRes.status}`)
  if (!weatherRes.ok) throw new Error(`Weather API error: ${weatherRes.status}`)

  const airJson = (await airRes.json()) as AirQualityLocation | AirQualityLocation[]
  const weatherJson = (await weatherRes.json()) as
    | WeatherLocation
    | WeatherLocation[]

  const airList = Array.isArray(airJson) ? airJson : [airJson]
  const weatherList = Array.isArray(weatherJson) ? weatherJson : [weatherJson]

  const sensors = sites
    .map((site, i) => buildSensor(site, airList[i], weatherList[i]))
    .filter((s): s is Sensor => s != null)

  const categoryStats = (Object.keys(CATEGORY_COLORS) as SensorCategory[]).map(
    (cat) => ({
      name: CATEGORY_COLORS[cat].name,
      fill: CATEGORY_COLORS[cat].fill,
      value: sensors.filter((s) => s.category === cat).length,
    }),
  )

  let trendData: TrendPoint[] = []
  if (airTrendRes.ok && weatherTrendRes.ok) {
    const airTrend = (await airTrendRes.json()) as AirQualityLocation
    const weatherTrend = (await weatherTrendRes.json()) as WeatherLocation
    trendData = buildTrend(airTrend.hourly, weatherTrend.hourly)
  }

  return {
    sensors,
    alerts: buildAlerts(sensors),
    trendData,
    zoneComparison: buildZoneComparison(sensors),
    categoryStats,
    fetchedAt: new Date().toLocaleString('en-IN', { timeZone: TZ }),
  }
}
