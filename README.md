# CityPulse Mumbai

**Live smart-city dashboard** for Mumbai, Maharashtra — air quality, traffic emissions, rainfall, and solar data on an interactive map.

Built as a portfolio project covering **front-end development**, **geospatial visualization**, and **UI/UX** for dashboard & app developer roles.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Leaflet-Maps-199900?logo=leaflet&logoColor=white" alt="Leaflet" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Data-Open--Meteo-0891b2" alt="Open-Meteo" />
</p>

---

## Overview

CityPulse turns public environmental APIs into a single, readable dashboard:

- **15 monitoring sites** at real Mumbai landmarks (Gateway of India, Bandra, Dadar TT, Thane Creek, Powai, etc.)
- **Live metrics** refreshed every 15 minutes from [Open-Meteo](https://open-meteo.com/) — no API key required
- **Interactive map** (Leaflet + OpenStreetMap) with filters, popups, and fly-to selection
- **Charts & KPIs** (Recharts) for trends, zone comparison, and alerts

---

## Live data (what is real)

| View | Metric | Source |
|------|--------|--------|
| Air Quality | US AQI, PM2.5 | [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) (Copernicus CAMS) |
| Traffic | NO₂ (µg/m³) | Same API — standard proxy for **vehicle emissions** at busy junctions |
| Flood / Rain | Precipitation (mm) | [Open-Meteo Weather API](https://open-meteo.com/en/docs) |
| Energy | Solar radiation (W/m²) | Open-Meteo Weather API |

> **Note:** Traffic shows **real NO₂ pollution**, not road “congestion %” (that requires paid traffic APIs like Google/TomTom). This is scientifically valid for urban mobility and emissions monitoring.

---

## Features

### Overview
- KPI cards (active sites, alerts, average AQI, average NO₂)
- 24-hour trend chart (AQI, NO₂, solar radiation)
- Sensor distribution by category
- Auto-generated alerts when thresholds are exceeded

### Map Explorer
- Full-screen geospatial map centered on Mumbai
- Color-coded markers (healthy / warning / critical)
- Layer filters by category and status
- Sensor list + detail panel with data source attribution

### Analytics
- Zone-level bar charts and health matrix
- Solar irradiance time series

---

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Maps | Leaflet, React-Leaflet, OpenStreetMap tiles |
| Charts | Recharts |
| Icons | Lucide React |
| Build | Vite 8 |
| Data | Open-Meteo REST APIs (fetch, no backend) |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- Internet connection (live API calls)

### Install & run

```bash
git clone <your-repo-url>
cd citypulse-mumbai
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other commands

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Project structure

```
citypulse-mumbai/
├── public/                 # Static assets (favicon)
├── src/
│   ├── config/
│   │   └── mumbaiSites.ts  # Monitoring locations (lat/lng, zones)
│   ├── services/
│   │   └── openMeteo.ts    # Live API fetch & sensor mapping
│   ├── hooks/
│   │   └── useCityData.ts  # State, filters, auto-refresh
│   ├── components/
│   │   ├── dashboard/      # KPIs, charts, alerts
│   │   ├── layout/         # Sidebar, header, data banner
│   │   ├── map/            # Leaflet map & filters
│   │   └── ui/             # Card, Badge
│   ├── pages/              # Overview, Map, Analytics
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## How it works

1. On load, `fetchLiveMumbaiData()` calls Open-Meteo with **batch coordinates** for all 15 sites.
2. Responses are mapped to `Sensor` objects with status rules (e.g. AQI ≤ 50 = healthy).
3. Alerts are generated from sensors in warning/critical state.
4. Hourly history for Mumbai center powers the trend charts.
5. Data refreshes automatically every **15 minutes**; manual refresh via the banner button.

---

## Resume / interview talking points

- Integrated **multiple REST APIs** and normalized data into a unified dashboard model.
- Built **geospatial UX**: markers, popups, fly-to, category/status filters.
- Designed a **responsive multi-page SPA** with reusable components and strict TypeScript types.
- Used **real public datasets** with clear attribution and honest metric labeling (AQI vs NO₂ proxy).

---

## Deployment

Build static files and deploy to any static host:

```bash
npm run build
```

Deploy the `dist/` folder to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or GitHub Pages.

---

## Limitations & future work

- Open-Meteo uses a ~11 km grid — nearby sites may show similar values.
- Road congestion % would need TomTom/Google APIs (optional `.env` key).
- A backend could cache responses and add historical archives.

---

## License

MIT — free to use, modify, and showcase in your portfolio.

---

## Author

Portfolio project — **CityPulse Mumbai**  
Data courtesy of [Open-Meteo](https://open-meteo.com/) and [OpenStreetMap](https://www.openstreetmap.org/copyright).
