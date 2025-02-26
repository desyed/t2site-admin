import { memo } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserLabelProps {
  name: string;
  avatarUrl?: string | null;
  className?: string | null;
  currentUser?: boolean;
  avatarClassName?: string | null;
}

export const UserLabel = memo(function UserLabel({
  name,
  avatarUrl,
  className,
  currentUser,
  avatarClassName,
}: UserLabelProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar className={cn('size-6 rounded-full', avatarClassName)}>
        <AvatarImage src={avatarUrl ?? undefined} alt={name} />
        <AvatarFallback>{name ?? ''}</AvatarFallback>
      </Avatar>
      <span className={cn('truncate', currentUser && '')}>
        {name}
        {currentUser && (
          <span className="ml-0.5 text-sm font-normal text-yellow-500">
            (you)
          </span>
        )}
      </span>
    </div>
  );
});
