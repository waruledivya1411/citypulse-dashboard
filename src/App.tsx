import { DataBanner } from './components/layout/DataBanner'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { useCityData } from './hooks/useCityData'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { MapExplorerPage } from './pages/MapExplorerPage'
import { OverviewPage } from './pages/OverviewPage'

export default function App() {
  const {
    view,
    setView,
    filters,
    setFilters,
    filteredSensors,
    selectedSensor,
    selectSensor,
    toggleCategory,
    toggleStatus,
    kpis,
    alerts,
    trendData,
    zoneComparison,
    categoryStats,
    loading,
    error,
    fetchedAt,
    refresh,
  } = useCityData()

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar view={view} onNavigate={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          view={view}
          search={filters.search}
          onSearchChange={(search) => setFilters((f) => ({ ...f, search }))}
          alertCount={criticalCount}
        />
        <DataBanner
          loading={loading}
          error={error}
          fetchedAt={fetchedAt}
          onRefresh={refresh}
        />

        <main className="flex-1 overflow-y-auto bg-[#0f1419]">
          {view === 'overview' && (
            <OverviewPage
              kpis={kpis}
              alerts={alerts}
              trendData={trendData}
              categoryStats={categoryStats}
              loading={loading}
              onNavigateToMap={() => setView('map')}
            />
          )}
          {view === 'map' && (
            <MapExplorerPage
              sensors={filteredSensors}
              filters={filters}
              selectedSensor={selectedSensor}
              onSelectSensor={selectSensor}
              onClearSelection={() => selectSensor(null)}
              onToggleCategory={toggleCategory}
              onToggleStatus={toggleStatus}
              loading={loading}
            />
          )}
          {view === 'analytics' && (
            <AnalyticsPage
              trendData={trendData}
              zoneComparison={zoneComparison}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  )
}
