import { AxiosError } from 'axios';
import { useEffect } from 'react';

import {
  useOrganizationMembersQuery,
  useRedirectIfProjectNotExists,
} from '@/app/team-members/organization.hooks';
import { InputSearch } from '@/components/ui/search-input';

import { OrgMembersTable } from './org-members-table';

export default function OrgMembers({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}) {
  const {
    data: members,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useOrganizationMembersQuery();

  // const redirect = useRedirectIfProjectNotExists();

  useEffect(() => {
    if (refresh && !isFetching) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch, setRefresh, isFetching]);

  // useEffect(() => {
  //   if (
  //     error &&
  //     error instanceof AxiosError &&
  //     error.response?.status === 404
  //   ) {
  //     redirect();
  //   }
  // }, [error, redirect]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Organization members
        </h2>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <InputSearch
          placeholder="Search for members"
          className="h-9 max-w-sm"
        />
      </div>
      <OrgMembersTable
        members={members || []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    </section>
  );
}
