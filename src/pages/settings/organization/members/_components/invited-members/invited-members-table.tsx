import { SendIcon } from 'lucide-react';

import type { InvitedMember } from '@/app/organization/organizaion-type';
import type { SiteTableColumn } from '@/components/site-table';
import type { StatusType } from '@/components/status-badge';

import CopyButton from '@/components/copy-button';
import MemberRoleBadge from '@/components/organization/member-role-badge';
import SiteTable from '@/components/site-table';
import { StatusBadge } from '@/components/status-badge';
import { UserLabel } from '@/components/user-label';
import { createOrganizationInvitationLink } from '@/lib/organization';
import { dayJs, tableTimeRelativeFormat } from '@/lib/time';

import InvitedMemberActions from './invited-member-actions';
type InvitedMembersTableProps = {
  invitedMembers: InvitedMember[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};

export default function InvitedMembersTable({
  invitedMembers,
  isLoading,
  isFetching,
  error,
  refetch,
}: InvitedMembersTableProps) {
  const columns: SiteTableColumn<InvitedMember>[] = [
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
      title: 'INVITED BY',
      key: 'invitedBy',
      width: 'w-[250px]',
      noWrap: true,
      render: (member) => (
        <UserLabel
          name={member.invitedBy?.name}
          currentUser={member.invitedBy?.currentUser}
          avatarUrl={member.invitedBy?.avatar}
        />
      ),
    },
    {
      title: 'INVITED AT',
      key: 'createdAt',
      width: 'w-[200px]',
      noWrap: true,
      render: (member) => tableTimeRelativeFormat(member.createdAt),
    },
    {
      title: 'INVITE LINK',
      key: 'inviteLink',
      width: 'w-[200px]',
      noWrap: true,
      render: (member) => {
        const inviteLink = createOrganizationInvitationLink(member.id);
        const hasExpired = dayJs(member.expiresAt).isBefore(dayJs());
        return (
          <div className="flex items-center gap-2">
            {!hasExpired && (
              <CopyButton
                showToasterMessage="Copied invited link to clipboard"
                className="size-6 [&_svg]:size-3"
                size="sm"
                text={inviteLink}
              />
            )}
            {hasExpired ? (
              <span className="flex items-center gap-2 text-red-400">
                Invitation expired - please resend
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">
                Expires in {dayJs(member.expiresAt).add(24, 'hours').fromNow()}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: 'STATUS',
      key: 'status',
      width: 'w-[150px]',
      noWrap: true,
      render: (member) => {
        const hasExpired = dayJs(member.expiresAt).isBefore(dayJs());
        if (hasExpired) {
          return <StatusBadge status="expired" />;
        }
        return <StatusBadge status={member.status as StatusType} />;
      },
    },
    {
      title: '',
      width: 'w-[100px]',
      render: (member) => <InvitedMemberActions member={member} />,
    },
  ];

  return (
    <SiteTable
      title="Invited Members"
      data={invitedMembers ?? []}
      columns={columns}
      loading={isLoading}
      fetching={isFetching}
      rowKey="id"
      error={error}
      onRefresh={refetch}
      description="There are no outstanding invitations. Would you like to invite a new team member?"
      emptyStateAction={{
        label: 'Invite member',
        icon: <SendIcon className="size-4" />,
        onClick: () => document.getElementById('invite-member-trigger')?.click(),
      }}
    />
  );
}
