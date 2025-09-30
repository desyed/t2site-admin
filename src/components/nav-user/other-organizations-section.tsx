import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { TOrganization } from '@/app/auth/auth.store';

import { useAuthStore } from '@/app/auth/auth.store';
import { changeCurrentOrganizationApi } from '@/app/team-members/organization.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useApi } from '@/hooks/use-api';

import MemberRoleBadge from '../organization/member-role-badge';

type OtherOrganizationsSectionProps = {
  setCreateOrganizationDialogOpen: (open: boolean) => void;
};

export function OtherOrganizationsSection({
  setCreateOrganizationDialogOpen,
}: OtherOrganizationsSectionProps) {
  const userOrganizations = useAuthStore((state) => state.userOrganization);

  const navigate = useNavigate();
  const { executeMutation } = useApi<{
    currentOrganizationId: string;
    access_token: string;
  }>(changeCurrentOrganizationApi);

  const handleChangeOrganization = async (organization: TOrganization) => {
    toast.promise(executeMutation({ organizationId: organization.id }), {
      loading: 'Changing organization...',
      success: (result) => {
        if (result.data?.currentOrganizationId) {
          navigate(`/auth?ocr=true&rp=/dashboard`);
          return `Now organization switched to ${organization.name}`;
        } else {
          return `Failed to change organization!`;
        }
      },
      error: 'Failed to change organization!',
      position: 'top-center',
      duration: 1000,
    });
  };

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs font-medium uppercase text-muted-foreground">
          Other Organizations
        </DropdownMenuLabel>
        <div className="site-scrollbar max-h-[calc(100vh-55vh)] overflow-x-hidden">
          {userOrganizations?.organizations.map(
            (organization: TOrganization) =>
              String(organization.id) !==
                userOrganizations?.currentOrganization?.id?.toString() && (
                <DropdownMenuItem
                  onSelect={() => handleChangeOrganization(organization)}
                  key={organization.id}
                  className="flex items-center gap-3 py-2"
                >
                  <Avatar className="size-6 rounded-full">
                    <AvatarImage
                      src={organization.logo ?? ''}
                      alt={organization.name ?? ''}
                    />
                    <AvatarFallback className="rounded-lg">
                      {organization.name ?? ''}
                    </AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1 flex-1">
                    {organization.name}
                  </span>
                  <MemberRoleBadge role={organization.role} />
                </DropdownMenuItem>
              )
          )}
        </div>

        <DropdownMenuItem
          className="flex items-center gap-3 py-2"
          onSelect={() => setCreateOrganizationDialogOpen(true)}
        >
          <Plus className="size-4" />
          <span>Create Organization</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
}
