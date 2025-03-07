import { queryClient } from '@/query-client';

import { fetchProjects, fetchProjectServices } from './project.fetch';
import { projectQueryKeys, projectServiceQueryKeys } from './projects.keys';

export async function preFetchProjects() {
  return await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.projectList(),
    queryFn: () => fetchProjects(),
  });
}

export async function preFetchProjectServices(projectId: string) {
  return await queryClient.prefetchQuery({
    queryKey: projectServiceQueryKeys.projectServiceList(projectId),
    queryFn: () => fetchProjectServices(projectId),
  });
}
