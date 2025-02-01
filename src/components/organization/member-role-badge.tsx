import { Role } from "@/app/organization/organizaion-type";
import { Badge } from "@/components/ui/badge";

// Define a mapping from Role to the Badge variant
const roleVariantMap: Record<Role, "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"> = {
  admin: "success",
  member: "info",
  owner: "warning",
};

interface MemberRoleBadgeProps {
  role: Role;
}

export default function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  // Look up the variant for this role; if no mapping exists, use "default"
  const variant = roleVariantMap[role] || "default";

  return (
    <Badge className="sm:text-[11px] uppercase" variant={variant}>
      {role}
    </Badge>
  );
}
