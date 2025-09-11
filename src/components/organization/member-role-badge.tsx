import type { LucideIcon } from 'lucide-react';

import { Shield, User, Crown } from 'lucide-react';

import type { Role } from '@/app/organization/organizaion.type';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define a mapping from Role to the Badge variant
const roleVariantMap: Record<
  Role,
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'
> = {
  admin: 'success',
  member: 'info',
  owner: 'warning',
};

// Change the type to use LucideIcon
const roleIconMap: Record<Role, LucideIcon> = {
  admin: Shield,
  member: User,
  owner: Crown,
};

type BadgeSize = 'sm' | 'md' | 'lg';

const badgeSizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[9px] py-0 h-4 [&_svg]:size-2.5 pl-1 pr-2',
  md: 'text-[11px] py-0 h-5 [&_svg]:size-3.5 pl-1.5 pr-2.5',
  lg: 'text-sm py-0.5 h-6 [&_svg]:size-4.5 pl-2 pr-3',
};

interface MemberRoleBadgeProps {
  role: Role;
  size?: BadgeSize;
  className?: string;
}

export default function MemberRoleBadge({
  role,
  size = 'md',
  className,
}: MemberRoleBadgeProps) {
  const variant = roleVariantMap[role] || 'default';
  const Icon = roleIconMap[role];

  return (
    <Badge
      className={cn(
        'inline-flex items-center gap-1 font-medium uppercase',
        badgeSizeStyles[size],
        className
      )}
      variant={variant}
    >
      {Icon && <Icon />}
      {role}
    </Badge>
  );
}
