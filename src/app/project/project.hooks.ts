import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleApiErrorException } from '@/lib/utils';

import type {
  CreateProjectInput,
  Project,
  ProjectService,
} from './project.type';

import { memberQueryKeys } from '../organization/organization.keys';
import { createProjectApi, updateProjectServiceApi } from './project.api';
import { fetchProjects, fetchProjectServices } from './project.fetch';
import { projectQueryKeys, projectServiceQueryKeys } from './projects.keys';

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
      // Cancel any outgoing refetches
      await client.cancelQueries({
        queryKey: getKey(payload.projectId),
      });

      // Snapshot the previous value
      const previouseProjectServices = client.getQueryData(
        getKey(payload.projectId)
      ) as ProjectService;

      // Optimistically update the cache
      const updatedProjectServices = {
        ...previouseProjectServices,
        [payload.serviceId]: {
          ...previouseProjectServices[
            payload.serviceId as keyof ProjectService
          ],
          active: payload.active,
        },
      };

      // Update the cache
      client.setQueryData(getKey(payload.projectId), updatedProjectServices);

      return { updatedProjectServices, previouseProjectServices };
    },
    onError: (_err, variables, context) => {
      handleApiErrorException(_err, true);
      if (context?.previouseProjectServices) {
        client.setQueryData(
          getKey(variables.projectId),
          context.previouseProjectServices
        );
        client.invalidateQueries({
          queryKey: getKey(variables.projectId),
        });
      }
    },
  });
  return mutation;
}
