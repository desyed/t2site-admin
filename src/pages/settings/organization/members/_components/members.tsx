import { Link, ShieldCheck, SparklesIcon } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import InviteMemberDialog from './invited-members/invite-member-dialog';
import InvitedMembers from './invited-members/invited-members';
import OrgMembers from './org-members/org-members';
export default function Members() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="space-y-10">
      {/* Invited Members Section */}
      <InvitedMembers refresh={refresh} setRefresh={setRefresh} />
      <div className="mt-5 flex items-center justify-between gap-4">
        <InviteMemberDialog />
        <Button variant="outline" size="sm" onClick={() => setRefresh(!refresh)} disabled={refresh}>
          <RefreshCw className={`mr-2 size-4 ${refresh ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      {/* Organization Members Section */}
      <OrgMembers refresh={refresh} setRefresh={setRefresh} />

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
        <p className="mb-4 text-muted-foreground">
          Subscribe to the Teams addon to use this feature.
        </p>
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
          <label htmlFor="email-notifications">
            Email all current members when a new member joins
          </label>
        </div>
      </section>
    </div>
  );
}
