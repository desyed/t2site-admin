import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

import type { CreateProjectInput, Project } from './project.type';

import { createProjectApi } from './project.api';
import { fetchProject, fetchProjects } from './project.fetch';
import { projectQueryKeys } from './projects.keys';

export function useProjectsQuery() {
  const query = useQuery({
    queryKey: projectQueryKeys.projectList(),
    queryFn: () => fetchProjects(),
  });
  return query;
}

export function useProjectQuery(projectId: string) {
  const query = useQuery({
    queryKey: projectQueryKeys.projectById(projectId),
    queryFn: () => fetchProject(projectId),
  });
  return query;
}

export function useCurrentProjectQuery() {
  const projectId = useParams().projectId;
  const query = useQuery({
    queryKey: projectQueryKeys.projectById(projectId ?? ''),
    queryFn: () => fetchProject(projectId ?? ''),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
  return query;
}

export function useCreateProjectMutation<
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
    },
    ...options,
  });
  return mutation;
}
