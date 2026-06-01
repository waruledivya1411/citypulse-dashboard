import { cn } from '../../lib/utils'
import type { SensorStatus } from '../../types'

const variants: Record<SensorStatus, string> = {
  healthy: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-400 ring-amber-500/30',
  critical: 'bg-rose-500/15 text-rose-400 ring-rose-500/30',
}

interface BadgeProps {
  status: SensorStatus
  children: React.ReactNode
  className?: string
}

export function Badge({ status, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset capitalize',
        variants[status],
        className,
      )}
    >
      {children}
    </span>
  )
}
