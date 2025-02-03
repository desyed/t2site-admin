import { MoreHorizontal, Link, ShieldCheck, PencilIcon, XIcon, SparklesIcon, SendIcon } from "lucide-react"
import { InviteMemberDialog } from "@/components/organization/invite-member-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInviteMembersQuery } from "@/app/organization/organization-hooks"
import CopyButton from "@/components/copy-button"
import { createOrganizationInvitationLink } from "@/lib/organization"
import MemberRoleBadge from "@/components/organization/member-role-badge"
import { tableTimeRelativeFormat } from "@/lib/time"

export default function Members() {
  const { data: invitedMembers } = useInviteMembersQuery()

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">Pending invites</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">INVITEE</TableHead>
              <TableHead className="w-[150px]">LEVEL</TableHead>
              <TableHead className="w-[250px]">INVITED BY</TableHead>
              <TableHead className="w-[200px]">INVITED AT</TableHead>
              <TableHead className="w-[200px]">INVITE LINK</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitedMembers && invitedMembers?.length > 0 ? (
              invitedMembers?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <MemberRoleBadge role={member.role} />
                  </TableCell>
                  <TableCell>{member.invitedBy?.name}</TableCell>
                  <TableCell>{tableTimeRelativeFormat(member.createdAt)}</TableCell>
                  <TableCell>
                    <CopyButton
                      className="max-w-64 w-full"
                      showToasterMessage="Copied invited link to clipboard"
                      title={createOrganizationInvitationLink(member.id)}
                      size="sm"
                      text={createOrganizationInvitationLink(member.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="[&_svg]:size-4">
                          <SendIcon className="mr-2" /> Resend invitation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <XIcon className="mr-2 size-4" /> Cancel invitation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  <div className="p-2 md:text-center">
                    There are no outstanding invitations. You can invite another team member.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>


        <div className="mt-5">
          <InviteMemberDialog />
        </div>
      </section>

      {/* Organization Members Section */}
      <section >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">Organization members</h2>
        </div>

        <div className="mb-4">
          <Input placeholder="Search for members" className="max-w-sm" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">NAME</TableHead>
              <TableHead className="w-[300px]">EMAIL</TableHead>
              <TableHead className="w-[150px]">LEVEL</TableHead>
              <TableHead className="w-[150px]">2FA</TableHead>
              <TableHead className="w-[150px]">JOINED</TableHead>
              <TableHead className="w-[150px]">LAST LOGGED IN</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Shanto Islam (you)</TableCell>
              <TableCell>ishanto722722@gmail.com</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>
                <span className="rounded-md bg-yellow-500/20 px-2 py-1 text-xs text-yellow-500">
                  2FA not enabled
                </span>
              </TableCell>
              <TableCell>11 days ago</TableCell>
              <TableCell>2 hours ago</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PencilIcon className="mr-2 size-4" />
                      Edit member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <XIcon className="mr-2 size-4" />
                      Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="rounded-lg border bg-card p-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-full bg-yellow-500/20 p-2">
            <ShieldCheck className="size-5 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold">Enforce 2FA</h2>
        </div>
        <p className="mb-4 text-muted-foreground">
          Require all users in your organization to enable two-factor authentication.
        </p>
        <p className="mb-4 text-muted-foreground">Subscribe to the Teams addon to use this feature.</p>
        <Button variant="secondary">
          <SparklesIcon className="mr-1 size-4" />
          Upgrade now
        </Button>
      </section>

      <section className="pb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Notification preferences
            <Link className="size-4 text-muted-foreground" />
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" />
          <label htmlFor="email-notifications">Email all current members when a new member joins</label>
        </div>
      </section>
    </div>
  )
}

