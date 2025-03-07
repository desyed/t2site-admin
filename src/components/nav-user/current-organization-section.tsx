import { CreditCard, Folder, Settings, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import MemberRoleBadge from '../organization/member-role-badge';

export function CurrentOrganizationSection() {
  const currentOrganization = useAuthStore(
    (state) => state.userOrganization?.currentOrganization
  );
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs font-medium uppercase text-muted-foreground">
          Current Organization
        </DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => navigate('/settings/organization')}
          className="flex items-center gap-3"
        >
          <Avatar className="size-9 rounded-full">
            <AvatarImage
              src={currentOrganization?.logo ?? ''}
              alt={currentOrganization?.name ?? ''}
            />
            <AvatarFallback className="rounded-lg text-lg">
              {currentOrganization?.name ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <span className="max-w-[150px] flex-1 truncate">
              {currentOrganization?.name}
            </span>
            <span>
              <MemberRoleBadge
                size="sm"
                role={currentOrganization?.role ?? 'member'}
              />
            </span>
          </div>
          <Settings className="ml-1 size-4 text-muted-foreground" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 py-2"
          onSelect={() => navigate('/projects')}
        >
          <Folder className="size-4" />
          <span>Projects</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 py-2"
          onSelect={() => navigate('/settings/organization/members')}
        >
          <Users className="size-4" />
          <span>Members</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 py-2"
          onSelect={() => navigate('/settings/organization/billing')}
        >
          <CreditCard className="size-4" />
          <span>Billing</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
}
