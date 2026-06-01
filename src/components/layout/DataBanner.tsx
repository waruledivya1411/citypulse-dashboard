import { Loader2, RefreshCw, Wifi } from 'lucide-react'

interface DataBannerProps {
  loading: boolean
  error: string | null
  fetchedAt: string | null
  onRefresh: () => void
}

export function DataBanner({
  loading,
  error,
  fetchedAt,
  onRefresh,
}: DataBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 bg-cyan-500/5 px-6 py-2.5">
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <Wifi className="h-3.5 w-3.5 text-cyan-400" />
        <span>
          <strong className="text-cyan-300">Live data</strong> — Open-Meteo
          (CAMS air quality + weather) for Mumbai monitoring points
        </span>
        {fetchedAt && !loading && (
          <span className="text-slate-500">· Updated {fetchedAt} IST</span>
        )}
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500/40 hover:text-cyan-300 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5" />
        )}
        Refresh
      </button>
      {error && (
        <p className="w-full text-xs text-rose-400">
          {error} — Check your internet connection and try again.
        </p>
      )}
    </div>
  )
}
