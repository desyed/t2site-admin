import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Timer,
  Loader2,
  CheckCircle,
  LucideIcon
} from "lucide-react"

export type StatusType =
  | "active"
  | "pending"
  | "error"
  | "closed"
  | "expired"
  | "processing"
  | "completed"

const statusConfig: Record<StatusType, { style: string; Icon: LucideIcon }> = {
  active: {
    style: "bg-green-500/20 text-green-600 hover:bg-green-500/30",
    Icon: CheckCircle2
  },
  pending: {
    style: "bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30",
    Icon: Clock
  },
  error: {
    style: "bg-red-500/20 text-red-600 hover:bg-red-500/30",
    Icon: AlertCircle
  },
  closed: {
    style: "bg-gray-500/20 text-gray-600 hover:bg-gray-500/30",
    Icon: XCircle
  },
  expired: {
    style: "bg-orange-500/20 text-orange-600 hover:bg-orange-500/30",
    Icon: Timer
  },
  processing: {
    style: "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30",
    Icon: Loader2
  },
  completed: {
    style: "bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/30",
    Icon: CheckCircle
  }
}

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status] || {
    style: "bg-gray-500/15 text-gray-700",
    Icon: Clock
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-2 py-1 capitalize inline-flex items-center gap-1 text-xs",
        config.style
      )}
    >
      <config.Icon size={14} />
      {status}
    </Badge>
  )
}

