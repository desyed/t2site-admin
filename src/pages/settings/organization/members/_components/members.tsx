import {
  MoreHorizontal,
  Link,
  ShieldCheck,
  PencilIcon,
  XIcon,
  PlusIcon,
  SparklesIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Members() {
  return (
    <div className="space-y-10 ">
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Pending invites
          </h2>
          <Button variant="secondary" size="sm" >
          <PlusIcon className="mr-1 size-4" />
          Invite team member
        </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>INVITEE</TableHead>
              <TableHead>LEVEL</TableHead>
              <TableHead>CREATED BY</TableHead>
              <TableHead>CREATED</TableHead>
              <TableHead>INVITE LINK</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground">
                There are no outstanding invitations. You can invite another
                team member above.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

       
      </section>

      {/* Organization Members Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Organization members
          </h2>
        </div>

        <div className="mb-2">
          <Input placeholder="Search for members" className="max-w-sm" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>LEVEL</TableHead>
              <TableHead>2FA</TableHead>
              <TableHead>JOINED</TableHead>
              <TableHead>LAST LOGGED IN</TableHead>
              <TableHead></TableHead>
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
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="[&_svg]:size-4">
                      <PencilIcon /> Edit member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-8 w-full justify-start text-sm text-destructive/80 hover:bg-destructive/20 hover:text-destructive focus:bg-destructive/20 focus:text-destructive/80">
                      <XIcon /> Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Two-factor Authentication Section */}
      <section className="rounded-lg border bg-card p-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-full bg-yellow-500/20 p-2">
            <ShieldCheck className="size-5 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold">Enforce 2FA</h2>
        </div>
        <p className="mb-4 text-muted-foreground">
          Require all users in your organization to enable two-factor
          authentication.
        </p>
        <p className="mb-4 text-muted-foreground">
          Subscribe to the Teams addon to use this feature.
        </p>
        <Button variant="secondary">
          <SparklesIcon className="mr-1 size-4" />
          Upgrade now
        </Button>
      </section>

      {/* Notification Preferences Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Notification preferences
            <Link className="size-4 text-muted-foreground" />
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" />
          <label htmlFor="email-notifications">
            Email all current members when a new member joins
          </label>
        </div>
      </section>
    </div>
  );
}
