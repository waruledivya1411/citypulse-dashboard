import L from 'leaflet'
import { useEffect } from 'react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { CITY_CENTER, DEFAULT_ZOOM } from '../../config/mumbaiSites'
import { categoryLabels, statusColors } from '../../lib/utils'
import type { Sensor } from '../../types'

function MapController({
  selectedSensor,
}: {
  selectedSensor: Sensor | null
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedSensor) {
      map.flyTo([selectedSensor.lat, selectedSensor.lng], 15, {
        duration: 1.2,
      })
    }
  }, [selectedSensor, map])

  return null
}

interface CityMapProps {
  sensors: Sensor[]
  selectedSensor: Sensor | null
  onSelectSensor: (sensor: Sensor) => void
}

export function CityMap({
  sensors,
  selectedSensor,
  onSelectSensor,
}: CityMapProps) {
  return (
    <MapContainer
      center={[CITY_CENTER.lat, CITY_CENTER.lng]}
      zoom={DEFAULT_ZOOM}
      className="h-full min-h-[400px] w-full rounded-xl z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedSensor={selectedSensor} />
      {sensors.map((sensor) => {
        const isSelected = selectedSensor?.id === sensor.id
        return (
          <CircleMarker
            key={sensor.id}
            center={[sensor.lat, sensor.lng]}
            radius={isSelected ? 14 : 10}
            pathOptions={{
              color: statusColors[sensor.status],
              fillColor: statusColors[sensor.status],
              fillOpacity: isSelected ? 0.9 : 0.65,
              weight: isSelected ? 3 : 2,
            }}
            eventHandlers={{
              click: () => onSelectSensor(sensor),
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <strong className="text-sm">{sensor.name}</strong>
                <p className="mt-1 text-xs opacity-80">
                  {categoryLabels[sensor.category]}
                </p>
                <p className="mt-2 text-base font-bold">
                  {sensor.value} {sensor.unit}
                </p>
                <p className="mt-1 text-xs capitalize">{sensor.status}</p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

// Fix default marker icon paths (Leaflet + bundlers)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
