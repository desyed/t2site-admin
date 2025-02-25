import { useEffect } from 'react';

import { useInviteMembersQuery } from '@/app/organization/organization-hooks';
import { Input } from '@/components/ui/input';

import InvitedMembersTable from './invited-members-table';
export default function InvitedMembers({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}) {
  const { data: invitedMembers, isFetching, error, refetch, isLoading } = useInviteMembersQuery();

  useEffect(() => {
    if (refresh && !isFetching) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch, setRefresh, isFetching]);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">Invited Members</h2>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <Input placeholder="Search for invited members" className="h-9 max-w-sm" />
      </div>

      <InvitedMembersTable
        invitedMembers={invitedMembers || []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    </section>
  );
}
