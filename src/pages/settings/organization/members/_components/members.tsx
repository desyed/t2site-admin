import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import {
  MoreHorizontal,
  Link,
  ShieldCheck,
  PencilIcon,
  XIcon,
  PlusIcon,
  SparklesIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Members() {
  return (
    <div className="space-y-10 mb-10">
      <section>
        <div className="flex items-center gap-5 flex-wrap justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Pending invites
          </h2>
          <Button variant="secondary" size="sm" className="mt-4">
          <PlusIcon className="mr-1 w-4 h-4" />
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Organization members
          </h2>
        </div>

        <div className="mb-4">
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
                <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-md text-xs">
                  2FA not enabled
                </span>
              </TableCell>
              <TableCell>11 days ago</TableCell>
              <TableCell>2 hours ago</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="[&_svg]:size-4">
                      <PencilIcon /> Edit member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full justify-start text-sm h-8 hover:bg-destructive/20 hover:text-destructive text-destructive/80 focus:text-destructive/80 focus:bg-destructive/20">
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
      <section className="bg-card rounded-lg p-6 border">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-yellow-500/20 p-2 rounded-full">
            <ShieldCheck className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold">Enforce 2FA</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Require all users in your organization to enable two-factor
          authentication.
        </p>
        <p className="text-muted-foreground mb-4">
          Subscribe to the Teams addon to use this feature.
        </p>
        <Button variant="secondary">
          <SparklesIcon className="mr-1 w-4 h-4" />
          Upgrade now
        </Button>
      </section>

      {/* Notification Preferences Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Notification preferences
            <Link className="h-4 w-4 text-muted-foreground" />
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
