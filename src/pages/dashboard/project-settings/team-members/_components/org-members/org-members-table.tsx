import { UserPlusIcon } from 'lucide-react';

import type { OrganizationMember } from '@/app/organization/organizaion.type';
import type { SiteTableColumn } from '@/components/site-table';

import MemberRoleBadge from '@/components/organization/member-role-badge';
import SiteTable from '@/components/site-table';
import { UserLabel } from '@/components/user-label';
import { tableTimeRelativeFormat } from '@/lib/time';

import MemberActions from './members-actions';

type OrgMembersTableProps = {
  members: OrganizationMember[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};

export function OrgMembersTable({
  members,
  isLoading,
  isFetching,
  error,
  refetch,
}: OrgMembersTableProps) {
  const columns: SiteTableColumn<OrganizationMember>[] = [
    {
      title: 'USER',
      key: 'user',
      width: 'w-[300px]',
      noWrap: true,
      render: (member) => (
        <UserLabel
          name={member.user?.name}
          avatarUrl={member.user?.avatar}
          currentUser={member.currentUser}
        />
      ),
    },
    {
      title: 'EMAIL',
      key: 'email',
      width: 'w-[300px]',
      noWrap: true,
    },
    {
      title: 'ROLE',
      key: 'role',
      width: 'w-[150px]',
      noWrap: true,
      render: (member) => <MemberRoleBadge role={member.role} />,
    },
    {
      title: 'JOINED AT',
      key: 'createdAt',
      width: 'w-[200px]',
      noWrap: true,
      render: (member) => tableTimeRelativeFormat(member.createdAt),
    },
    {
      title: '',
      width: 'w-[100px]',
      render: (member) => <MemberActions member={member} />,
    },
  ];

  return (
    <SiteTable
      title="Organization Members"
      data={members ?? []}
      columns={columns}
      loading={isLoading}
      fetching={isFetching}
      rowKey="id"
      error={error}
      onRefresh={refetch}
      description="There are no members in this organization. Invite a new team member to get started."
      emptyStateAction={{
        label: 'Invite member',
        icon: <UserPlusIcon className="size-4" />,
        onClick: () =>
          document.getElementById('invite-member-trigger')?.click(),
      }}
    />
  );
}
