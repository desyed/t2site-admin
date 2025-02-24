import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserLabelProps {
  name: string;
  avatarUrl?: string | null;
  className?: string | null;
}

export function UserLabel({ name, avatarUrl, className }: UserLabelProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <Avatar className="size-6 rounded-full">
        <AvatarImage src={avatarUrl ?? undefined} alt={name} />
        <AvatarFallback>{name ?? ''}</AvatarFallback>
      </Avatar>
      <span className="text-[0.75rem] font-medium">{name}</span>
    </div>
  );
} 