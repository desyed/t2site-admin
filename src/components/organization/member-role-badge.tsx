import type { LucideIcon } from 'lucide-react';

import { Shield, User, Crown } from 'lucide-react';

import type { Role } from '@/app/organization/organizaion.type';

import { Badge } from '@/components/ui/badge';

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

interface MemberRoleBadgeProps {
  role: Role;
}

export default function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  const variant = roleVariantMap[role] || 'default';
  const Icon = roleIconMap[role];

  return (
    <Badge
      className="![&_svg]:size-4 inline-flex items-center gap-1 uppercase
    sm:text-[11px]
    "
      variant={variant}
    >
      {Icon && <Icon size={14} />}
      {role}
    </Badge>
  );
}
