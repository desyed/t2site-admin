import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import type { Project } from '@/app/project/project.type';

import {
  useInviteMembersQuery,
  useRedirectIfProjectNotExists,
} from '@/app/project-member/project-member.hooks';
import { InputSearch } from '@/components/ui/search-input';

import InvitedMembersTable from './invited-members-table';
export default function InvitedMembers({
  refresh,
  setRefresh,
  currentProject,
}: {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  currentProject: Project;
}) {
  const { projectId } = useParams();

  const {
    data: invitedMembers,
    isFetching,
    error,
    refetch,
    isLoading,
  } = useInviteMembersQuery(projectId ?? '');

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
  // }, [error, redirect, setRefresh]);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Invited Members
        </h2>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <InputSearch
          onClear={() => {}}
          placeholder="Search for invited members"
          className="h-9 max-w-sm"
        />
      </div>

      <InvitedMembersTable
        invitedMembers={invitedMembers || []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
        currentProject={currentProject}
      />
    </section>
  );
}
