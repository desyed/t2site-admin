import { Badge } from "@/components/ui/badge"

type RoleVariant = {
  [key in 'admin' | 'member' | 'owner' | 'none']: "default" | "secondary" | "destructive" | "outline" | "success" | "info"
}

const roleVariants: RoleVariant = {
  admin: "success",
  member: "info",
  owner: "default",
  none: "secondary"
}

interface RoleBadgeProps {
  role: 'admin' | 'member' | 'owner' | 'none'
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge variant={roleVariants[role]} className="uppercase">
      {role}
    </Badge>
  )
} 