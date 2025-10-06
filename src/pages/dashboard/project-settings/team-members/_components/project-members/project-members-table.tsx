import { UserPlusIcon } from 'lucide-react';

import type { ProjectMember } from '@/app/project-member/project-member.type';
import type { Project } from '@/app/project/project.type';
import type { SiteTableColumn } from '@/components/site-table';

import MemberRoleBadge from '@/components/project-member/member-role-badge';
import SiteTable from '@/components/site-table';
import { UserLabel } from '@/components/user-label';
import { tableTimeRelativeFormat } from '@/lib/time';

import MemberActions from './members-actions';

type ProjectMembersTableProps = {
  members: ProjectMember[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
  currentProject: Project;
};

export function ProjectMembersTable({
  members,
  isLoading,
  isFetching,
  error,
  refetch,
  currentProject,
}: ProjectMembersTableProps) {
  const columns: SiteTableColumn<ProjectMember>[] = [
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
      render: (member) => (
        <MemberActions member={member} currentProject={currentProject} />
      ),
    },
  ];

  return (
    <SiteTable
      title="Project Members"
      data={members ?? []}
      columns={columns}
      loading={isLoading}
      fetching={isFetching}
      rowKey="id"
      error={error}
      onRefresh={refetch}
      description="There are no members in this project. Invite a new team member to get started."
      emptyStateAction={{
        label: 'Invite member',
        icon: <UserPlusIcon className="size-4" />,
        onClick: () =>
          document.getElementById('invite-member-trigger')?.click(),
      }}
    />
  );
}
