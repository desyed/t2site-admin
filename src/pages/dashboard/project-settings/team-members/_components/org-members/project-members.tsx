import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import type { Project } from '@/app/project/project.type';

import {
  useProjectMembersQuery,
  useRedirectIfProjectNotExists,
} from '@/app/project-member/project-member.hooks';
import { InputSearch } from '@/components/ui/search-input';

import { ProjectMembersTable } from './project-members-table';

export default function ProjectMembers({
  refresh,
  setRefresh,
  currentProject,
}: {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  currentProject: Project;
}) {
  const {
    data: members,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useProjectMembersQuery(currentProject?.id ?? '');

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
          Project members
        </h2>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <InputSearch
          placeholder="Search for members"
          className="h-9 max-w-sm"
        />
      </div>
      <ProjectMembersTable
        members={members || []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
        currentProject={currentProject}
      />
    </section>
  );
}
