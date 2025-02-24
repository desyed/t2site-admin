import { Role } from "@/app/organization/organizaion-type";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Crown } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define a mapping from Role to the Badge variant
const roleVariantMap: Record<Role, "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"> = {
  admin: "success",
  member: "info",
  owner: "warning",
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
  // Look up the variant for this role; if no mapping exists, use "default"
  const variant = roleVariantMap[role] || "default";
  const Icon = roleIconMap[role];

  return (
    <Badge className="sm:text-[11px] uppercase inline-flex items-center gap-1" variant={variant}>
      {Icon && <Icon size={14} />}
      {role}
    </Badge>
  );
}
