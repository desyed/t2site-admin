import { CreditCard, Settings, Users } from 'lucide-react';
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
  const userOrganizations = useAuthStore((state) => state.userOrganization);
  const navigate = useNavigate();

  const currentOrganization = userOrganizations?.currentOrganization;

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs font-medium uppercase text-muted-foreground">
          Current Organization
        </DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => navigate('/settings/organization')}
          className="flex items-center gap-3 py-2"
        >
          <Avatar className="size-6 rounded-full">
            <AvatarImage
              src={currentOrganization?.logo ?? ''}
              alt={currentOrganization?.name ?? ''}
            />
            <AvatarFallback className="rounded-lg">
              {currentOrganization?.name ?? ''}
            </AvatarFallback>
          </Avatar>
          <span className="line-clamp-1 flex-1">
            {currentOrganization?.name}
          </span>
          <MemberRoleBadge role={currentOrganization?.role ?? 'member'} />
          <Settings className="ml-1 size-4 text-muted-foreground" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 py-2"
          onSelect={() => navigate('/settings/organization/members')}
        >
          <Users className="size-4" />
          <span>Members</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 py-2">
          <CreditCard className="size-4" />
          <span>Billing</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
}
