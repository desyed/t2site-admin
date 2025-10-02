import { queryClient } from '@/query-client';

import { fetchProject, fetchProjects } from './project.fetch';
import { projectQueryKeys, projectServiceQueryKeys } from './projects.keys';

export async function preFetchProjects() {
  return await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.projectList(),
    queryFn: () => fetchProjects(),
  });
}

export async function preFetchProject(projectId: string) {
  return await queryClient.fetchQuery({
    queryKey: projectQueryKeys.projectById(projectId),
    queryFn: () => fetchProject(projectId),
  });
}
