import { useInviteMembersQuery } from "@/app/organization/organization-hooks"
import InviteMemberDialog from "@/pages/settings/organization/members/_components/invited-members/invite-member-dialog"
import InvitedMembersTable from "./invited-members-table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function InvitedMembers() {
  const { data: invitedMembers, isFetching, error, refetch, isLoading } = useInviteMembersQuery()


  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">Invited Members</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`mr-2 size-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <InvitedMembersTable
        invitedMembers={invitedMembers || []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />

      <div className="mt-5">
        <InviteMemberDialog />
      </div>
    </section>
  )
}
