import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { Organization } from '@/app/organization/organizaion.type';

import { useAuthStore } from '@/app/auth/auth.store';
import { changeCurrentOrganizationApi } from '@/app/organization/organization.api';
import { CommandItem } from '@/components/ui/command';
import { useApi } from '@/hooks/use-api';

import OrganizationLabel from '../organization-label';

export default function OrganizationPopoverItem({
  organization,
  closePopover,
}: {
  organization: Organization;
  closePopover: () => void;
}) {
  const currentProject = useAuthStore((state) => state.currentProject);
  const navigate = useNavigate();

  const { executeMutation } = useApi<{
    currentOrganizationId: string;
    access_token: string;
  }>(changeCurrentOrganizationApi);

  const handleChangeOrganization = async () => {
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
    closePopover();
  };
  return (
    <CommandItem
      className="cursor-pointer"
      onSelect={() => handleChangeOrganization()}
    >
      <OrganizationLabel titleTruncateLimit={150} organization={organization} />
      {currentProject?.id === organization.id && (
        <Check className="ml-auto size-4 text-primary" />
      )}
    </CommandItem>
  );
}
