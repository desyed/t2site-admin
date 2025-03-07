import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { CreateProjectInput, Project } from './project.type';

import { memberQueryKeys } from '../organization/organization.keys';
import { createProjectApi } from './project.api';
import { fetchProjects } from './project.fetch';
import { projectQueryKeys } from './projects.keys';

export function useProjectsQuery() {
  const query = useQuery({
    queryKey: projectQueryKeys.projectList(),
    queryFn: () => fetchProjects(),
  });
  return query;
}

export function useCreateProjectMutaion<
  T = {
    data: {
      success: boolean;
      message: string;
      data: Project;
    };
  },
>(options?: UseMutationOptions<T, unknown, CreateProjectInput>) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return createProjectApi({
        payload,
      }) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.projectList(),
      });
      queryClient.invalidateQueries({ queryKey: memberQueryKeys.memberList() });
    },
    ...options,
  });
  return mutation;
}
