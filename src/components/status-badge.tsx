import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Timer,
  Loader2,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'active'
  | 'pending'
  | 'error'
  | 'closed'
  | 'expired'
  | 'processing'
  | 'completed'
  | 'rejected'
  | 'accepted';

// Size variants for the StatusBadge component (xs, sm, md, lg, xl)
export type StatusBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const statusConfig: Record<StatusType, { style: string; Icon: LucideIcon }> = {
  active: {
    style:
      'bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20',
    Icon: CheckCircle2,
  },
  pending: {
    style:
      'bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-yellow-500/20',
    Icon: Clock,
  },
  error: {
    style: 'bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20',
    Icon: AlertCircle,
  },
  closed: {
    style:
      'bg-gray-500/15 text-gray-600 hover:bg-gray-500/25 border-gray-500/20',
    Icon: XCircle,
  },
  expired: {
    style:
      'bg-orange-500/15 text-orange-600 hover:bg-orange-500/25 border-orange-500/20',
    Icon: Timer,
  },
  processing: {
    style:
      'bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20',
    Icon: Loader2,
  },
  completed: {
    style:
      'bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20',
    Icon: CheckCircle,
  },
  rejected: {
    style: 'bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20',
    Icon: XCircle,
  },
  accepted: {
    style:
      'bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20',
    Icon: CheckCircle,
  },
};

// Configuration for different badge sizes
const sizeConfig: Record<
  StatusBadgeSize,
  { containerStyles: string; iconSize: string; textSize: string }
> = {
  xs: {
    containerStyles: 'px-1.5 py-0.5',
    iconSize: 'h-2.5 w-2.5',
    textSize: 'text-[0.65rem]',
  },
  sm: {
    containerStyles: 'px-2 py-0.5',
    iconSize: 'h-3 w-3',
    textSize: 'text-xs',
  },
  md: {
    containerStyles: 'px-2.5 py-1',
    iconSize: 'h-3.5 w-3.5',
    textSize: 'text-sm',
  },
  lg: {
    containerStyles: 'px-3 py-1.5',
    iconSize: 'h-4 w-4',
    textSize: 'text-sm',
  },
  xl: {
    containerStyles: 'px-3.5 py-2',
    iconSize: 'h-5 w-5',
    textSize: 'text-base',
  },
};

export function StatusBadge({
  status,
  size = 'sm', // Default size is sm
  loading = false,
  className,
}: {
  status: StatusType;
  size?: StatusBadgeSize;
  loading?: boolean;
  className?: string;
}) {
  const config = statusConfig[status] || {
    style:
      'bg-gray-500/15 text-gray-600 hover:bg-gray-500/25 border-gray-500/20',
    Icon: Clock,
  };

  const { containerStyles, iconSize, textSize } = sizeConfig[size];

  return (
    <Badge
      variant="secondary"
      className={cn(
        'inline-flex items-center gap-1.5 font-medium capitalize leading-none',
        'border transition-colors duration-200',
        containerStyles,
        config.style,
        className
      )}
    >
      <span className="relative flex items-center justify-center">
        {loading ? (
          <Loader2
            className={cn(iconSize, 'animate-spin')}
            style={{
              animationDuration: '0.8s',
              animationTimingFunction: 'linear',
            }}
          />
        ) : (
          <config.Icon className={iconSize} />
        )}
      </span>
      <span className={cn('uppercase', textSize)}>{status}</span>
    </Badge>
  );
}
