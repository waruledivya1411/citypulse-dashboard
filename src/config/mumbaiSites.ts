import type { SensorCategory } from '../types'

/** Real Mumbai landmarks — coordinates from OpenStreetMap / official map data */
export interface MumbaiSite {
  id: string
  name: string
  zone: string
  lat: number
  lng: number
  category: SensorCategory
}

export const CITY_CENTER = { lat: 19.076, lng: 72.8777 }
export const DEFAULT_ZOOM = 11

export const MUMBAI_SITES: MumbaiSite[] = [
  {
    id: 'm1',
    name: 'Gateway of India',
    zone: 'Colaba',
    lat: 18.922,
    lng: 72.8347,
    category: 'air_quality',
  },
  {
    id: 'm2',
    name: 'Bandra-Worli Sea Link',
    zone: 'Bandra',
    lat: 19.04,
    lng: 72.813,
    category: 'air_quality',
  },
  {
    id: 'm3',
    name: 'Andheri East Metro',
    zone: 'Andheri',
    lat: 19.1136,
    lng: 72.8697,
    category: 'air_quality',
  },
  {
    id: 'm4',
    name: 'Powai Lake',
    zone: 'Powai',
    lat: 19.1176,
    lng: 72.906,
    category: 'air_quality',
  },
  {
    id: 'm5',
    name: 'Worli Sea Face',
    zone: 'Worli',
    lat: 19.0176,
    lng: 72.8133,
    category: 'air_quality',
  },
  {
    id: 'm6',
    name: 'Dadar TT Circle',
    zone: 'Dadar',
    lat: 19.0178,
    lng: 72.8478,
    category: 'traffic',
  },
  {
    id: 'm7',
    name: 'Sion Junction',
    zone: 'Sion',
    lat: 19.0438,
    lng: 72.8643,
    category: 'traffic',
  },
  {
    id: 'm8',
    name: 'Ghatkopar Station',
    zone: 'Ghatkopar',
    lat: 19.086,
    lng: 72.9081,
    category: 'traffic',
  },
  {
    id: 'm9',
    name: 'Mumbai Central',
    zone: 'Mumbai Central',
    lat: 18.9696,
    lng: 72.8193,
    category: 'traffic',
  },
  {
    id: 'm10',
    name: 'BKC Junction',
    zone: 'Bandra Kurla Complex',
    lat: 19.068,
    lng: 72.8699,
    category: 'traffic',
  },
  {
    id: 'm11',
    name: 'Dharavi Creek Belt',
    zone: 'Dharavi',
    lat: 19.04,
    lng: 72.855,
    category: 'flood',
  },
  {
    id: 'm12',
    name: 'Thane Creek',
    zone: 'Thane',
    lat: 19.2183,
    lng: 72.9781,
    category: 'flood',
  },
  {
    id: 'm13',
    name: 'Vashi Creek',
    zone: 'Navi Mumbai',
    lat: 19.076,
    lng: 72.9982,
    category: 'flood',
  },
  {
    id: 'm14',
    name: 'Juhu Beach Solar Zone',
    zone: 'Juhu',
    lat: 19.1,
    lng: 72.8347,
    category: 'energy',
  },
  {
    id: 'm15',
    name: 'Borivali National Park Edge',
    zone: 'Borivali',
    lat: 19.2307,
    lng: 72.8567,
    category: 'energy',
  },
]
