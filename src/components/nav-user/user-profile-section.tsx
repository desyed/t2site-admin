import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function UserProfileSection() {
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenuLabel className="text-xs font-medium uppercase text-muted-foreground">
        Signed in as
      </DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => navigate('/settings/user')}
        className="p-0 font-normal"
      >
        <div className="flex flex-1 items-center gap-3 p-2 text-left text-sm">
          <Avatar className="size-9 rounded-full">
            <AvatarImage src={authUser?.avatar ?? ''} alt={authUser?.name} />
            <AvatarFallback className="rounded-full">
              {authUser?.name ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold">{authUser?.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {authUser?.email}
            </span>
          </div>
          <Settings className="size-4 text-muted-foreground" />
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
}
