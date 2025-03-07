import { queryClient } from '@/query-client';

import { fetchProjects } from './project.fetch';
import { projectQueryKeys } from './projects.keys';

export async function preFetchProjects() {
  return await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.projectList(),
    queryFn: () => fetchProjects(),
  });
}
