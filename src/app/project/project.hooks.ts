import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { handleApiErrorException } from '@/lib/utils';

import type {
  CreateProjectInput,
  Project,
  ProjectService,
} from './project.type';

import { createProjectApi, updateProjectServiceApi } from './project.api';
import {
  fetchProject,
  fetchProjects,
  fetchProjectServices,
} from './project.fetch';
import { projectQueryKeys, projectServiceQueryKeys } from './projects.keys';

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
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: 'offlineFirst',
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

export function useProjectServicesQuery(projectId: string | undefined | null) {
  const query = useQuery({
    queryKey: projectServiceQueryKeys.projectServiceList(projectId ?? ''),
    queryFn: () => fetchProjectServices(projectId ?? ''),
    enabled: !!projectId,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return query;
}

export function useOptimisticProjectServiceUpdateMutation() {
  const getKey = (projectId: string) => {
    return projectServiceQueryKeys.projectServiceList(projectId);
  };

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: {
      active: boolean;
      projectId: string;
      serviceId: string;
    }) => {
      return updateProjectServiceApi({
        payload: {
          active: payload.active,
        },
        projectId: payload.projectId,
        serviceId: payload.serviceId,
      });
    },
    onMutate: async (payload) => {
      // Cancel any outgoing refetch
      await client.cancelQueries({
        queryKey: getKey(payload.projectId),
      });

      // Snapshot the previous value
      const previousProjectServices = client.getQueryData(
        getKey(payload.projectId)
      ) as ProjectService;

      // Optimistically update the cache
      const updatedProjectServices = {
        ...previousProjectServices,
        [payload.serviceId]: {
          ...previousProjectServices[payload.serviceId as keyof ProjectService],
          active: payload.active,
        },
      };

      // Update the cache
      client.setQueryData(getKey(payload.projectId), updatedProjectServices);

      return {
        updatedProjectServices,
        previousProjectServices: previousProjectServices,
      };
    },
    onError: (_err, variables, context) => {
      handleApiErrorException(_err, true);
      if (context?.previousProjectServices) {
        client.setQueryData(
          getKey(variables.projectId),
          context.previousProjectServices
        );
        client.invalidateQueries({
          queryKey: getKey(variables.projectId),
        });
      }
    },
  });
  return mutation;
}
