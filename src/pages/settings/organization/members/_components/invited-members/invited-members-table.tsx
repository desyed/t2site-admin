import CopyButton from "@/components/copy-button"
import { createOrganizationInvitationLink } from "@/lib/organization"
import MemberRoleBadge from "@/components/organization/member-role-badge"
import { dayJs, tableTimeRelativeFormat } from "@/lib/time"
import { UserLabel } from "@/components/user-label"
import SiteTable, { SiteTableColumn } from "@/components/site-table"
import { InvitedMember } from "@/app/organization/organizaion-type"
import InvitedMemberActions from "./invited-member-actions"
import { SendIcon } from "lucide-react"
type InvitedMembersTableProps = {
  invitedMembers: InvitedMember[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
}

export default function InvitedMembersTable({ invitedMembers, isLoading, isFetching, error, refetch }: InvitedMembersTableProps) {
  const columns: SiteTableColumn<InvitedMember>[] = [
    {
      title: "INVITEE",
      key: "email",
      width: "w-[300px]",
      noWrap: true
    },
    {
      title: "LEVEL",
      key: "role",
      width: "w-[150px]",
      noWrap: true,
      render: (member) => <MemberRoleBadge role={member.role} />
    },
    {
      title: "INVITED BY",
      key: "invitedBy",
      width: "w-[250px]",
      noWrap: true,
      render: (member) => (
        <UserLabel name={member.invitedBy?.name} avatarUrl={member.invitedBy?.avatar} />
      )
    },
    {
      title: "INVITED AT",
      key: "createdAt",
      width: "w-[200px]",
      noWrap: true,
      render: (member) => tableTimeRelativeFormat(member.createdAt)
    },
    {
      title: "INVITE LINK",
      key: "inviteLink",
      width: "w-[200px]",
      noWrap: true,
      render: (member) => (
        <div className="flex items-center gap-2">
          <CopyButton
            className="max-w-64 "
            showToasterMessage="Copied invited link to clipboard"
            size="sm"
            text={createOrganizationInvitationLink(member.id)}
          />
          <span className="text-xs text-muted-foreground">Expires in {dayJs(member.expiresAt).add(24, 'hours').fromNow()}</span>
        </div>
      )
    },
    {
      title: "",
      width: "w-[100px]",
      render: (member) => <InvitedMemberActions member={member} />
    }
  ];

  return (
    <SiteTable
      title="Invited Members"
      data={invitedMembers ?? []}
      columns={columns}
      loading={isLoading}
      fetching={isFetching}
      itemKey="id"
      error={error}
      onRefresh={refetch}
      description="There are no outstanding invitations. Would you like to invite a new team member?"
      emptyStateAction={{
        label: "Invite member",
        icon: <SendIcon className="size-4" />,
        onClick: () => document.getElementById('invite-member-trigger')?.click()
      }}

    />
  )
}
